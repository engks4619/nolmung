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

CRAWLING_DATA_CSV_FILE="spot_data_2.csv"
OUTPUT_FILE="spot_data_final_2"

STR_URL = 'url'
STR_ID = 'id'
STR_NAME = 'name'
STR_IMG_CNT = 'img_cnt'
STR_ADDRESS = 'address'
STR_TEL = 'tel'
STR_TAG = 'tag'
STR_DESC = 'desc'
STR_TIME = 'time'
STR_MENU = 'menu'
STR_LAT = 'lat'
STR_LNG = 'lng'

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
            'img_cnt': 0,
            'address': '',
            'tel': '',
            'tag': '',
            'desc': '',
            'time': '',
            'menu': '',
            'lat': '',
            'lng': '',
            'category': '식당',
        }

        with open(CRAWLING_DATA_CSV_FILE, 'r', newline='', encoding='utf8') as file:
            for crawlingValues in csv.reader(file, skipinitialspace=True):
                self.crawlingCategory.append({
                        STR_ID: crawlingValues[0],
                        STR_URL: "https://www.diningcode.com/profile.php?rid=" + crawlingValues[0],
                        STR_NAME: crawlingValues[1],
                        STR_IMG_CNT: crawlingValues[2],
                        STR_ADDRESS: crawlingValues[3],
                        STR_TEL : crawlingValues[4],
                        STR_TAG : crawlingValues[5],
                        STR_DESC : crawlingValues[6],
                        STR_TIME : crawlingValues[7],
                        STR_MENU : crawlingValues[8],
                        STR_LAT : crawlingValues[9],
                        STR_LNG : crawlingValues[10]
                    })
    
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
            'category': '식당',
        }

        self.data_dict['id'] = crawlingID
        self.data_dict['name'] = categoryValue[STR_NAME]
        self.data_dict['img_cnt'] = categoryValue[STR_IMG_CNT]
        self.data_dict['address'] = categoryValue[STR_ADDRESS]
        self.data_dict['tel'] = categoryValue[STR_TEL]
        self.data_dict['tag'] = categoryValue[STR_TAG]
        self.data_dict['desc'] = categoryValue[STR_DESC]
        self.data_dict['time'] = categoryValue[STR_TIME]
        self.data_dict['menu'] = categoryValue[STR_MENU]
        self.data_dict['lat'] = categoryValue[STR_LAT]
        self.data_dict['lng'] = categoryValue[STR_LNG]

        print("Crawling Start : " + self.getCurrentTime(), file= LOG_FILE)
        crawlingFile = open(f'{OUTPUT_FILE}.csv', 'a', newline='', encoding='utf8')
        crawlingData_csvWriter = csv.writer(crawlingFile)

        try:
            # print(crawlingURL + " : " + self.getCurrentTime(), file=LOG_FILE)
            print(crawlingID, categoryValue[STR_NAME])
            browser = webdriver.Chrome(CHROMEDRIVER_PATH, options=self.chrome_option)
            browser.get(crawlingURL)
            wait = WebDriverWait(browser, 10)
            wait.until(EC.invisibility_of_element((By.CLASS_NAME, 's-list pic-grade')))

            html = browser.find_element(By.XPATH, '//div[@class="s-list pic-grade"]').get_attribute('outerHTML')
            selector = Selector(text=html)

            try:
                tag_list = selector.xpath('//div[@class="btxt"]/*') 
                isCafe = False      
                for t in tag_list:
                    tag = t.xpath('./text()').get().strip()
                    if('카페' in tag or '커피' in tag):
                        isCafe = True
                        break
                if(isCafe):
                    self.data_dict['category'] = '카페'
            except:
                print("tag info not found!")
            
            # print(list(self.data_dict.values()))
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
    crawler = DiningCodeDetailCrawler()
    crawler.StartCrawling()
    # print(addr_to_lat_lon("서울특별시 강남구 역삼동 709"))
    # LOG_FILE.close()
