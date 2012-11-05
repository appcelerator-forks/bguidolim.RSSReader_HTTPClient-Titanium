Titanium.UI.setBackgroundColor('#000');

var winReader = Titanium.UI.createWindow({
	title:'RSS Reader',
    backgroundColor:'#fff',
    modal:true,
    barColor: '#000'
});
 
var btnVoltar = Ti.UI.createButton({
    title: 'Voltar'
});

var httpRSS = Titanium.Network.createHTTPClient();
var listaRSS = [];
 
winReader.open();

httpRSS.onload = function() {
	var rssXML = this.responseXML;
	var rssCanal = rssXML.documentElement.getElementsByTagName("channel");
	var rssTitulo = rssCanal.item(0).getElementsByTagName("title").item(0).text;
	var rssItens = rssXML.documentElement.getElementsByTagName("item");
 
	winReader.title = rssTitulo;
   
	for (i = 0; i < rssItens.length; i++) {
		var rssPostTitulo = rssItens.item(i).getElementsByTagName("title").item(0).text;
		var rssPostLink = rssItens.item(i).getElementsByTagName("link").item(0).text;
 
		var rssLinha = Ti.UI.createTableViewRow({
			top:0,
          	hasChild: true,
          	borderColor:'#000',
          	link: rssPostLink
      	});
 
      	if (i % 2 == 0){
         	rssLinha.backgroundColor='#cddae2';
     	} else {
        	rssLinha.backgroundColor='#fff';
      	}
 
      	var rssLabel = Ti.UI.createLabel({
          	text: rssPostTitulo,
          	textAlign:'left',
          	left:0,
          	height:40,
          	width:'auto',
          	top:3,
          	color:'#000',
          	font:{fontSize:'x-small'}
      	});
 
      	rssLinha.add(rssLabel);
      	listaRSS.push(rssLinha);
   	}
   	
	var tvRSS = Titanium.UI.createTableView({
    	data:listaRSS,
       	top:0
   	});
 
   	winReader.add(tvRSS);
 
   	tvRSS.addEventListener('click',function(e) {
      	var webFeed = Titanium.UI.createWebView({
          	url: e.rowData.link
      	});
 
      	btnVoltar.addEventListener('click',function(){
          	winReader.remove(webFeed);
          	winReader.leftNavButton = null;
      	});
 
      	winReader.leftNavButton = btnVoltar;
      	winReader.add(webFeed);
   	});
};

httpRSS.open('GET','http://feeds.feedburner.com/OBigola');
httpRSS.send();
