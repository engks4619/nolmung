import json
from msilib import CAB
from time import sleep
from bs4 import Tag
import requests
import csv

from multiprocessing import Pool

DATA_CSV_FILE = "spot_info_origin.csv"
OUTPUT_FILE = "geocode_seoul"

PROCESS_COUNT = 1

STR_ID = 'id'
STR_NAME = 'name'
STR_IMG_CNT = 'img_cnt'
STR_ADRESS = 'adress'
STR_TEL = 'tel'
STR_TAG = 'tag'
STR_DESC = 'desc'
STR_TIME = 'time'
STR_MENU = 'menu'

def addr_to_lat_lon(addr):
    url = 'https://dapi.kakao.com/v2/local/search/address.json?query={address}'.format(address=addr)
    headers = {"Authorization": "KakaoAK " + "5d339211bac97f20d9fe0992a3da1481"}
    result = json.loads(str(requests.get(url, headers=headers).text))
    if(result and 'documents' in result and len(result['documents']) > 0): 
        match_first = result['documents'][0]['address']
        if ((30 < float(match_first['y']) < 40) and (120 < float(match_first['x']) < 135)):
            return float(match_first['y']), float(match_first['x'])
        else:
            return (0, 0)
    else:
        return (0, 0)

class GetGeoCode:
    def __init__(self):
        self.errorList = list()
        self.categoryValue = list()
        self.data_dict = {
            'id': '',
            'name': '',
            'img_cnt': '',
            'adress': '',
            'tel': '',
            'tag': '',
            'desc': '',
            'time': '',
            'menu': '',
            'lat': '',
            'lng': '',
        }
        with open(DATA_CSV_FILE, 'r', newline='', encoding='utf8') as file:
            for crawlingValues in csv.reader(file, skipinitialspace=True):
                self.categoryValue.append({
                    STR_ID: crawlingValues[0],
                    STR_NAME: crawlingValues[1],
                    STR_IMG_CNT: crawlingValues[2],
                    STR_ADRESS: crawlingValues[3],
                    STR_TEL : crawlingValues[4],
                    STR_TAG : crawlingValues[5],
                    STR_DESC : crawlingValues[6],
                    STR_TIME : crawlingValues[7],
                    STR_MENU : crawlingValues[8]
                })

    

    def run(self):
        self.initGeoCoder()

        if __name__ == '__main__':
            # for value in self.categoryValue:
                # self.CrawlingCategory(value)
            pool = Pool(processes=PROCESS_COUNT)
            pool.map(self.CrawlingCategory, self.categoryValue)
            pool.close()
            pool.join()

    def initGeoCoder(self):
        outFile = open(f'{OUTPUT_FILE}.csv', 'w', newline='', encoding='utf8')
        outData_csvWriter = csv.writer(outFile)
        outData_csvWriter.writerow(list(self.data_dict.keys()))
        outFile.close()

    def CrawlingCategory(self, categoryValue):
        ID = categoryValue[STR_ID]
        NAME = categoryValue[STR_NAME]
        ADRESS = categoryValue[STR_ADRESS]
        IMG_CNT = categoryValue[STR_IMG_CNT]
        TEL = categoryValue[STR_TEL]
        TAG = categoryValue[STR_TAG]
        MENU = categoryValue[STR_MENU]
        TIME = categoryValue[STR_TIME]
        DESC = categoryValue[STR_DESC]

        self.data_dict = {
            'id': '',
            'name': '',
            'img_cnt': '',
            'adress': '',
            'tel': '',
            'tag': '',
            'desc': '',
            'time': '',
            'menu': '',
            'lat': '',
            'lng': '',
        }
        self.data_dict['id'] = ID
        self.data_dict['name'] = NAME
        self.data_dict['adress'] = ADRESS
        self.data_dict['img_cnt'] = IMG_CNT
        self.data_dict['tel'] = TEL 
        self.data_dict['tag'] = TAG
        self.data_dict['menu'] = MENU
        self.data_dict['time'] = TIME
        self.data_dict['desc'] = DESC

        outFile = open(f'{OUTPUT_FILE}.csv', 'a', newline='', encoding='utf8')
        outData_csvWriter = csv.writer(outFile)

        geoData = addr_to_lat_lon(ADRESS)
        self.data_dict['lat'] = geoData[0]
        self.data_dict['lng'] = geoData[1]
        print(ID)
        print(list(self.data_dict.values()))

        outData_csvWriter.writerow(list(self.data_dict.values()))

if __name__ == '__main__':
    geoCoder = GetGeoCode()
    geoCoder.run()
#   print(addr_to_lat_lon("서울특별시 성북구 장위동 214-51"))
