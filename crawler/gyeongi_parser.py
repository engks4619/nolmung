# -*- coding: utf-8 -*-


list = []
data_list = [
  '<ul class="districtSelection"><li><button>전체</button></li><li><button>상남동</button></li><li><button>창원가로수길</button></li><li><button>시티세븐</button></li><li><button>창원대방동</button></li><li><button>창원시티세븐</button></li><li><button>창원중앙동</button></li><li><button>가음정</button></li><li><button>창원용호동</button></li><li><button>상남시장</button></li><li><button>반송시장</button></li><li><button>가음동</button></li><li><button>가음정동</button></li><li><button>귀곡동</button></li><li><button>귀산동</button></li><li><button>귀현동</button></li><li><button>남산동</button></li><li><button>남양동</button></li><li><button>남지동</button></li><li><button>내동</button></li><li><button>대방동</button></li><li><button>대원동</button></li><li><button>두대동</button></li><li><button>반림동</button></li><li><button>반송동</button></li><li><button>반지동</button></li><li><button>불모산동</button></li><li><button>사파동</button></li><li><button>사파정동</button></li><li><button>삼동동</button></li><li><button>삼정자동</button></li><li><button>상남동</button></li><li><button>상복동</button></li><li><button>성산동</button></li><li><button>성주동</button></li><li><button>신월동</button></li><li><button>신촌동</button></li><li><button>안민동</button></li><li><button>양곡동</button></li><li><button>완암동</button></li><li><button>외동</button></li><li><button>용지동</button></li><li><button>용호동</button></li><li><button>웅남동</button></li><li><button>적현동</button></li><li><button>중앙동</button></li><li><button>창곡동</button></li><li><button>천선동</button></li><li><button>토월동</button></li><li><button>퇴촌동</button></li><li><button>팔룡동</button></li></ul>'
]
# data = '<ul class="districtSelection"><li><button>전체</button></li><li><button>이태원</button></li><li><button>서울역</button></li><li><button>용산역</button></li><li><button>한남동</button></li><li><button>삼각지</button></li><li><button>해방촌</button></li><li><button>신용산</button></li><li><button>한강진역</button></li><li><button>이태원역</button></li><li><button>삼각지역</button></li><li><button>갈월동</button></li><li><button>남영동</button></li><li><button>도원동</button></li><li><button>동빙고동</button></li><li><button>동자동</button></li><li><button>문배동</button></li><li><button>보광동</button></li><li><button>산천동</button></li><li><button>서계동</button></li><li><button>서빙고동</button></li><li><button>신계동</button></li><li><button>신창동</button></li><li><button>용문동</button></li><li><button>용산동</button></li><li><button>원효로</button></li><li><button>이촌동</button></li><li><button>이태원동</button></li><li><button>주성동</button></li><li><button>청암동</button></li><li><button>청파동</button></li><li><button>한강로</button></li><li><button>한남동</button></li><li><button>효창동</button></li><li><button>후암동</button></li></ul>'
# data = data.replace('<ul class="districtSelection">',"").replace("<li><button>","").replace("</button></li>", "','")[4:-7]
for data in data_list:
  data = data.replace('<ul class="districtSelection">',"").replace("<li><button>","").replace("</button></li>", " ")[3:-6]
  list.append(data.split())

print(list)
# print(data.split( ))
# print(data)
