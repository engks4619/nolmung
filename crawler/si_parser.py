# -*- coding: utf-8 -*-

data = '<ul class="districtSelection"><li><button>전체</button></li><li><button>괴산군</button></li><li><button>단양군</button></li><li><button>보은군</button></li><li><button>영동군</button></li><li><button>옥천군</button></li><li><button>음성군</button></li><li><button>제천시</button></li><li><button>증평군</button></li><li><button>진천군</button></li><li><button>청주시</button></li><li><button>청주시 상당구</button></li><li><button>청주시 서원구</button></li><li><button>청주시 청원구</button></li><li><button>청주시 흥덕구</button></li><li><button>충주시</button></li></ul>'
tmpdata = data.replace('<ul class="districtSelection">',"").replace("<li><button>","").replace("</button></li>", " ")[3:-7]
data = data.replace('<ul class="districtSelection">',"").replace("<li><button>","").replace("</button></li>", "','")[4:-7]
print(len(data.split("','")))
print(data);