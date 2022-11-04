# -*- coding: utf-8 -*-

# danawa_cralwer.py
# sammy310

from ctypes import sizeof
import enum
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

from scrapy.selector import Selector

from datetime import datetime
from datetime import timedelta
from pytz import timezone
import csv
import os
import os.path
import shutil
import urllib.request
from time import sleep
from geopy.geocoders import Nominatim

from multiprocessing import Pool

from soupsieve import select

from multiprocessing import Pool

from GetGeoCode import addr_to_lat_lon
PROCESS_COUNT = 1
TIMEZONE = 'Asia/Seoul'

IMG_PATH="img/spot"
CRAWLING_DATA_CSV_FILE="dining_code_id_gyeongi_final.csv"
OUTPUT_FILE="spot_info_gyeongi"

STR_URL = 'url'
STR_ID = 'id'
STR_NAME = 'name'
CHROMEDRIVER_PATH = 'chromedriver.exe'

LOG_FILE = open('dining_code_detail_log.txt', 'w')
GEO_LOCAL = Nominatim(user_agent='South Korea')

def geocoding(address):
    try:
        geo = GEO_LOCAL.geocode(address)
        x_y = [geo.latitude, geo.longitude]
        return x_y

    except:
        return [0,0]

class DiningCodeDetailCrawler:
    def __init__(self):
        self.errorList = list()
        self.crawlingCategory = list()
        self.data_dict = {
            'id': '',
            'name': '',
            'img_cnt': '0',
            'address': '',
            'tel': '',
            'tag': '',
            'desc': '',
            'time': '',
            'menu': '',
            'lat': '',
            'lng': '',
        }

        with open(CRAWLING_DATA_CSV_FILE, 'r', newline='', encoding='utf8') as file:
            for crawlingValues in csv.reader(file, skipinitialspace=True):
                self.crawlingCategory.append({STR_ID: crawlingValues[0],STR_URL: "https://www.diningcode.com/profile.php?rid=" + crawlingValues[0], STR_NAME: crawlingValues[1]})
    
    def StartCrawling(self):
        self.chrome_option = webdriver.ChromeOptions()
        self.chrome_option.add_argument('--headless')
        self.chrome_option.add_argument('--window-size=1920,1080')
        self.chrome_option.add_argument('--start-maximized')
        self.chrome_option.add_argument('--disable-gpu')
        self.chrome_option.add_argument('lang=ko=KR')

        self.initCrawling()

        if __name__ == '__main__':
            pool = Pool(processes=PROCESS_COUNT)
            pool.map(self.CrawlingCategory, self.crawlingCategory)
            pool.close()
            pool.join()

    def initCrawling(self):
        crawlingFile = open(f'{OUTPUT_FILE}.csv', 'w', newline='', encoding='utf8')
        crawlingData_csvWriter = csv.writer(crawlingFile)
        # crawlingData_csvWriter.writerow([self.GetCurrentDate().strftime('%Y-%m-%d %H:%M:%S')])
        crawlingData_csvWriter.writerow(list(self.data_dict.keys()))
        crawlingFile.close()

    def CrawlingCategory(self, categoryValue):
        # crawlingName = categoryValue[STR_NAME]
        crawlingURL = categoryValue[STR_URL]
        crawlingID = categoryValue[STR_ID]
        imgPath = f'{IMG_PATH}/{crawlingID}'

        if os.path.exists(IMG_PATH) == False:
            os.mkdir(IMG_PATH)
            # shutil.rmtree(IMG_PATH)

        if os.path.exists(imgPath) == False:
            os.mkdir(imgPath)

        self.data_dict = {
            'id': '',
            'name': '',
            'img_cnt': 0,
            'address': '',
            'tel': '',
            'tag': '',
            'desc': '',
            'time': '',
            'menu': '',
            'lat': '',
            'lng': '',
        }

        self.data_dict['id'] = crawlingID
        self.data_dict['name'] = categoryValue[STR_NAME]

        print("Crawling Start : " + self.getCurrentTime(), file= LOG_FILE)
        crawlingFile = open(f'{OUTPUT_FILE}.csv', 'a', newline='', encoding='utf8')
        crawlingData_csvWriter = csv.writer(crawlingFile)

        try:
            print(crawlingURL + " : " + self.getCurrentTime(), file=LOG_FILE)
            print(crawlingID, categoryValue[STR_NAME])
            browser = webdriver.Chrome(CHROMEDRIVER_PATH, options=self.chrome_option)
            browser.implicitly_wait(0.5)
            browser.get(crawlingURL)
        
            ## 이미지 다운
            try:
                imgHtml = browser.find_element(By.XPATH, '//div[@class="s-list pic-grade"]').get_attribute('outerHTML')
                imgSelector = Selector(text=imgHtml)
                imgList = imgSelector.xpath('//ul[@class="store-pic button"]/li')

                opener = urllib.request.URLopener()
                opener.addheader('User-Agent', 'whatever')
                imgIdx = 0
                for imgTag in imgList:
                    img = imgTag.xpath('./img')
                    imgName = f'{imgPath}/{imgIdx}.jpg'
                    imgSrc = "https://d12zq4w4guyljn.cloudfront.net/"
                    if (imgIdx == 0):
                        imgSrc += img.attrib['src'].split("/")[-1]
                        # opener.retrieve(img.attrib['src'], imgName)
                    else:
                        imgSrc += img.attrib['src'].split("/")[-1][8:]
                    opener.retrieve(imgSrc, imgName)
                    imgIdx += 1
                    self.data_dict['img_cnt'] = imgIdx
            except Exception as e:
                print('')
                #################################

            html = browser.find_element(By.XPATH, '//div[@class="s-list basic-info"]').get_attribute('outerHTML')
            selector = Selector(text=html)

            locate = ''
            try:
                locate_list = selector.xpath('//li[@class="locat"]/*')
                for loc in locate_list:
                    locate += loc.xpath('text()').get()+" "
                self.data_dict['address'] = locate.strip();
            except:
                print("locate info not found")
            try:
                tel = selector.xpath('//li[@class="tel"]/text()').get()
                self.data_dict['tel'] = tel.strip()
            except:
                print("tel info not found")   
            try:
                tag = selector.xpath('//li[@class="tag"]/a/text()').get()
                self.data_dict['tag'] = tag.strip()
            except:
                print("tag info not found")
            description = ''
            try:
                desc_list = selector.xpath('//li[@class="char"]/*')
                for desc in desc_list:
                    description += desc.xpath('text()').get()+", "
                self.data_dict['desc'] = description[:-2].strip()
            except:
                print("desc info not found")
            html = browser.find_element(By.XPATH, '//div[@class="s-list detail-info"]').get_attribute('outerHTML')
            selector = Selector(text=html)
            #더보기 버튼 클릭해서 메뉴 펼치기
            try:
                browser.find_element(By.XPATH, '//*[@id="div_detail"]/div/p[2]/a').click()
                sleep(0.5)
            except:
                print("more-btn not found!")
            time = ''
            try:
                time_list = selector.xpath('//div[@class="busi-hours short"]/ul[@class="list"]/*')            
                for t in time_list:
                    time += t.xpath('./p[@class="l-txt"]/text()').get().strip() + ":" + t.xpath('./p[@class="r-txt"]/text()').get().strip() + "|"
                self.data_dict['time'] = time[:-1].strip()
            except:
                print("time info not found!")
            menu = ''
            try:

                menu_list = selector.xpath('//ul[@class="list Restaurant_MenuList"]/li')
                for m in menu_list:
                    menu += m.xpath('./p[@class="l-txt Restaurant_MenuItem"]/span/text()').get().strip() + ":" +  m.xpath('./p[@class="r-txt Restaurant_MenuPrice"]/text()').get().strip() + "|"
                self.data_dict['menu'] = menu[:-1].strip()
            except:
                print("menu info not found!")

            # 주소값으로 위경도 좌표 가져오기
            # try:
            #     geo = geocoding(self.data_dict['address'])
            #     self.data_dict['lat'] = geo[0]
            #     self.data_dict['lng'] = geo[1]
            # except:
            #     print("lat lng not found!")
            
            print(list(self.data_dict.values()))
            crawlingData_csvWriter.writerow(list(self.data_dict.values()))            

        except Exception as e:
            print('Error - ', file=LOG_FILE)
            print(e, file=LOG_FILE)
            print(self.getCurrentTime())
            # self.erroxList.append(crawlingName)

        crawlingFile.close()

        print('Crawling Finish : ' + self.getCurrentTime(), file=LOG_FILE)


    def GetCurrentDate(self):
        tz = timezone(TIMEZONE)
        return (datetime.now(tz))

    def getCurrentTime(self):
        cDate = self.GetCurrentDate().strftime('%Y-%m-%d_%H:%M:%S')
        return cDate

if __name__ == '__main__':
    # crawler = DiningCodeDetailCrawler()
    # crawler.StartCrawling()
    print(addr_to_lat_lon("서울특별시 강남구 역삼동 709"))
    # LOG_FILE.close()
