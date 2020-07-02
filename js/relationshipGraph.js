var c=document.getElementById("myCanvas");
var cxt=c.getContext("2d");
var ccc=document.getElementById("content");
var arrayListArcAndText=[];//保存所有图形和文字
var arrayListLine=[];//保存所有的箭头线
var startX,startY,endX,endY;
var isDragging=false;

class Circle {
    constructor(x, y, r,rr,c,text,size=25,color='#DB7093') {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.rectRadius=rr;
        this.content=c;
        this.color=color;
        this.text=text;
        this.size=size;
    }
}

class ArrowLine{
    constructor(sx,sy,ex,ey,radius=0){
        this.sx=sx;
        this.sy=sy;
        this.ex=ex;
        this.ey=ey;
        this.radius=radius;
    }
}

function drawArc(x,y,r,color) {
    if(color) cxt.fillStyle=color;
    else cxt.fillStyle="#FFF";
    cxt.save();
    cxt.beginPath();
    cxt.arc(x,y,r,0,Math.PI*2,true);
    cxt.closePath();
    cxt.fill();
}

function drawText(text,x,y,size){
    //绘制文字代码如下：
    cxt.save();
    // 设置字体
    cxt.font = size+"px bold 黑体";
    // 设置颜色
    cxt.fillStyle = "#000";
    // 设置水平对齐方式
    cxt.textAlign = "center";
    // 设置垂直对齐方式
    cxt.textBaseline = "middle";
    cxt.fillText(text,x,y);//IE不支持
}

function Line(x1,y1,x2,y2){
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
}
Line.prototype.drawWithArrowheads=function(ctx,radius){

    // arbitrary styling
    ctx.strokeStyle="white";
    ctx.fillStyle="white";
    ctx.lineWidth=2;
    
    // draw the line
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.x1,this.y1);
    ctx.lineTo(this.x2,this.y2);
    ctx.stroke();

    // draw the starting arrowhead
    //var startRadians=Math.atan((this.y2-this.y1)/(this.x2-this.x1));
    //startRadians+=((this.x2>this.x1)?-90:90)*Math.PI/180;
    //this.drawArrowhead(ctx,this.x1,this.y1,startRadians);
    // draw the ending arrowhead
    var endRadians=Math.atan((this.y2-this.y1)/(this.x2-this.x1));
    endRadians+=((this.x2>this.x1)?90:-90)*Math.PI/180;
    if(radius>0) endRadians+=radius;
    this.drawArrowhead(ctx,this.x2,this.y2,endRadians);

}
Line.prototype.drawArrowhead=function(ctx,x,y,radians){
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(radians);
    ctx.moveTo(0,0);
    ctx.lineTo(5,20);
    ctx.lineTo(-5,20);
    ctx.closePath();
    ctx.restore();
    ctx.fill();
}

window.onload=function () {
    var x,y,r,size,color,circle,arrowLine;
    x=50;
    y=450;
    r=25;
    size=25;
    color="#DB7093";    

    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    drawText('夏',x,y,size)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp夏朝（约前2070~前1600）是中国史书中记载的第一个世袭制朝代。一般认为夏朝共传十四代，十七后（夏统治者在位称“后”，去世后称“帝”），延续约471年，为商朝所灭。后人常以“华夏”自称，使之成为中国的代名词。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp根据史书记载，禹传位于子启，改变了原始部落的禅让制，开创中国近四千年世袭的先河。因此中国历史上的“家天下”，从夏朝的建立开始。夏族的十一支姒姓部落与夏后氏中央王室在血缘上有宗法关系，政治上有分封关系，经济上有贡赋关系，大致构成夏王朝的核心领土范围。夏西起河南省西部、山西省南部，东至河南省、山东省和河北省三省交界处，南达湖北省北部，北及河北省南部。这个区域的地理中心是今河南偃师、登封、新密、禹州一带。经夏商周断代史研究和中华文明探源工程初步勾勒出了公元前2500至前1500即尧舜时代到夏商之际的社会图景。中原地区包括禹都阳城（今河南郑州登封王城岗遗址）在内的夏朝时期六座规模大、等级高的中心性都邑，被列入了研究重点。','夏');
    arrayListArcAndText.push(circle);

    var line=new Line(x+r,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x+r,y,x+80,y);
    arrayListLine.push(arrowLine);

    x=150;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    drawText('商',x,y,size)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp商朝（约公元前1600年—约公元前1046年），是中国历史上的第二个朝代，是中国第一个有直接的同时期的文字记载的王朝。商朝经历了三个大的阶段。第一阶段是“先商”；第二阶段是“早商”；第三阶段是“晚商”，前后相传17世31王，延续500余年。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp商朝的王位继承制度，前期为兄终弟及，后期为典型的父死子继。商朝处于奴隶制鼎盛时期，成汤时期的国家权力已经初步确立，奴隶制的社会秩序亦已稳固。??奴隶主贵族是统治阶级，形成了庞大的官僚统治机构和军队。甲骨文和金文的记载是目前已经发现的中国最早的成系统的文字符号。','商');
    arrayListArcAndText.push(circle);

    line=new Line(x+r,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x+r,y,x+80,y);
    arrayListLine.push(arrowLine);

    x=250;
    drawArc(x,y,r+8,color)
    drawArc(x,y,r+5)
    drawText('西周',x,y,size)
    circle=new Circle(x,y,r+5,r+8,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp西周（前1046—前771），周是关中一个古老的部族，始祖名弃，善种植，尧舜时被封为“后稷”，封于邰（今陕西武功县及杨陵区一带）。公刘时由邰迁到邠（今彬县、旬邑县之间），到古公亶父时迁到岐山之阳的“周原”（今扶风县与岐山县交界处）。周人在这里兴建城邑、疆理田地、设置官吏、建立军队，商代晚期已为渭水中游的强盛诸侯国。姬昌（文王）迁都丰（今西安市长安区马王村一带）。姬昌死，其子姬发（武王）即位，在沣河的东岸营建镐京（今沣东新区斗门镇一带）并修文王绪业，公元前1046年，经牧野之战，灭商建立周朝，史称西周。','西周');
    arrayListArcAndText.push(circle);

    line=new Line(x+r,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x+r,y,x+80,y);
    arrayListLine.push(arrowLine);

    x=350;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    drawText('东周',x,y,size-3)
    circle=new Circle(x,y,r,r+3,'内容待更新','东周',size-3);
    arrayListArcAndText.push(circle);

    line=new Line(x+r,y,x+180,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x+r,y,x+180,y);
    arrayListLine.push(arrowLine);

    x=550;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    drawText('秦',x,y,size)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp秦朝（前221—前207）是由战国时期的秦国发展起来的中国历史上第一个大一统王朝，秦人的祖先大费是黄帝之孙颛顼的后裔，舜赐其嬴姓。秦穆公时，任贤使能，虚心纳谏，灭国十二，开地千里，国力日盛。前361年，秦孝公继位，重用商鞅两次变法，使秦国的经济得到发展，军队战斗力不断加强，发展成为战国后期最富强的诸侯国。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp秦王政先后灭韩、赵、魏、楚、燕、齐，完成统一大业。前221年，秦王政称帝，史称“秦始皇”。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp秦朝在中央设三公九卿，管理国家大事；地方上废除分封制，代以郡县制；实行书同文、车同轨、统一度量衡。对外北击匈奴，南征百越，筑长城以拒外敌，凿灵渠以通水系。中央集权制度的建立，奠定中国2000余年政治制度基本格局，奠定中国大一统王朝的统治基础，故称“百代都行秦政法”。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp秦朝结束了自春秋战国以来五百年来诸侯分裂割据的局面，成为中国历史上第一个多民族共融的中央集权制国家。对中国历史产生了深远影响。前210年，秦始皇巡游途中病死于沙丘（今河北省广宗县西北）。其子胡亥即位，为秦二世。秦王朝虽在历史上拥有巨大影响，但滥用民力，统一仅十余年。前209年，陈胜、吴广斩木为兵，揭竿而起，天下响应，刘邦、项羽起兵江淮共抗秦。前207年，秦亡。','秦');
    arrayListArcAndText.push(circle);

    //春秋七国
    x=400;
    y=390;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,525,450);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,525,450);
    arrayListLine.push(arrowLine);
    drawText('燕',x,y,size)
    circle=new Circle(x,y,r,r+3,'内容待更新','燕');
    arrayListArcAndText.push(circle);

    x=440;
    y=330;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,525,450);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,525,450);
    arrayListLine.push(arrowLine);
    drawText('赵',x,y,size)
    circle=new Circle(x,y,r,r+3,'内容待更新','赵');
    arrayListArcAndText.push(circle);

    x=480;
    y=270;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,525,450);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,525,450);
    arrayListLine.push(arrowLine);
    drawText('齐',x,y,size)
    circle=new Circle(x,y,r,r+3,'内容待更新','齐');
    arrayListArcAndText.push(circle);

    x=400;
    y=510;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,525,450);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,525,450);
    arrayListLine.push(arrowLine);
    drawText('韩',x,y,size)
    circle=new Circle(x,y,r,r+3,'内容待更新','韩');
    arrayListArcAndText.push(circle);

    x=440;
    y=570;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,525,450);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,525,450);
    arrayListLine.push(arrowLine);
    drawText('魏',x,y,size)
    circle=new Circle(x,y,r,r+3,'内容待更新','魏');
    arrayListArcAndText.push(circle);


    x=480;
    y=630;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,525,450);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,525,450);
    arrayListLine.push(arrowLine);
    drawText('楚',x,y,size)
    circle=new Circle(x,y,r,r+3,'内容待更新','楚');
    arrayListArcAndText.push(circle);
    //春秋结束
    x=550;
    y=450;
    line=new Line(x+r,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x+r,y,x+80,y);
    arrayListLine.push(arrowLine);

    x=650;
    drawArc(x,y,r+8,color)
    drawArc(x,y,r+5)
    drawText('西汉',x,y,size)
    circle=new Circle(x,y,r+5,r+8,'&nbsp&nbsp&nbsp&nbsp西汉（公元前202年—公元8年）是中国历史上的大一统王朝，共历十二帝，享国二百一十年，又称为前汉。秦末天下揭竿而起，经过楚汉之争，刘邦击败项羽，公元前202年刘邦在山东定陶称帝，国号汉，暂都洛阳，三个月后定都长安。西汉诸多制度上承袭秦制，汉初实行轻徭薄赋、休养生息的国策，社会经济迅速恢复。汉武帝继位后，推行推恩令、独尊儒术、加强中央集权。对外开拓朝鲜、南据越南、西逾葱岭、北达阴山，奠定汉朝基本疆域；派张骞出使西域、沟通中原与西域各国的联系。西汉自武帝之后，皆以外戚辅政。汉昭帝继位后，霍光辅政。汉宣帝时期，设置西域都护府，正式将西域纳入版图。汉元帝即位后，皇权旁落、外戚与宦官势力兴起，西汉开始走向衰败，又历经汉成帝、汉哀帝、汉平帝。公元8年王莽废除孺子婴太子之位，建立新朝，西汉灭亡。','西汉');
    arrayListArcAndText.push(circle);

    line=new Line(x+r,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x+r,y,x+80,y);
    arrayListLine.push(arrowLine);

    x=750;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)

    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);

    line=new Line(x,y,x+60,y-70);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+60,y-70);
    arrayListLine.push(arrowLine);

    line=new Line(x,y,x+60,y+70);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+60,y+70);
    arrayListLine.push(arrowLine);

    drawText('东汉',x,y,size-3)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp东汉（25年—220年）是中国历史上继西汉之后又一个大一统的中原王朝，传八世共十四帝，享国一百九十五年，与西汉统称汉朝。 <br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp东汉在文化、科技、军事、佛教等方面成就突出，文化上郑玄将经学推向高峰并开创郑学，科技上蔡伦改进造纸术，张衡发明地动仪和浑天仪，军事上迫使北匈奴西迁，佛教在此期间经白马寺传入中国。东汉豪强地主势力扩张并形成门阀士族，匈奴、羌族、氐族等民族内迁，北匈奴西迁后鲜卑人占据漠北，对后世产生深远影响。','东汉',size-3);
    arrayListArcAndText.push(circle);

    x=850;
    y=450;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)

    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('曹魏',x,y,size-5)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp三国（220年－280年）是上承东汉下启西晋的一段历史时期，分为曹魏、蜀汉、东吴三个政权。赤壁之战时，曹操被孙刘联军击败，奠定了三国鼎立的雏型。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp220年，曹丕篡汉称帝，定都洛阳，国号“魏”，史称曹魏，三国历史正式开始。次年刘备称帝，定都成都，史称蜀汉。222年刘备在夷陵之战失败，孙权获得荆州大部。223年刘备去世，诸葛亮辅佐刘备之子刘禅与孙权重新联盟。229年孙权称帝，定都建邺，国号“吴”，史称东吴，至此三国正式成立。此后的数十年内，蜀汉诸葛亮、姜维多次率军北伐曹魏，但始终未能改变三足鼎立的格局。曹魏后期的实权渐渐被司马懿掌控。263年，曹魏的司马昭发动魏灭蜀之战，蜀汉灭亡。两年后司马昭病死，其子司马炎废魏元帝自立，建国号为“晋”，史称西晋。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp公元280年，西晋灭东吴，统一中国，至此三国时期结束，进入晋朝时期。','曹魏',size-5);
    arrayListArcAndText.push(circle);

    x=820;
    y=360;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+120,y+65);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+120,y+65);
    arrayListLine.push(arrowLine);

    drawText('孙吴',x,y,size-5)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp三国（220年－280年）是上承东汉下启西晋的一段历史时期，分为曹魏、蜀汉、东吴三个政权。赤壁之战时，曹操被孙刘联军击败，奠定了三国鼎立的雏型。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp220年，曹丕篡汉称帝，定都洛阳，国号“魏”，史称曹魏，三国历史正式开始。次年刘备称帝，定都成都，史称蜀汉。222年刘备在夷陵之战失败，孙权获得荆州大部。223年刘备去世，诸葛亮辅佐刘备之子刘禅与孙权重新联盟。229年孙权称帝，定都建邺，国号“吴”，史称东吴，至此三国正式成立。此后的数十年内，蜀汉诸葛亮、姜维多次率军北伐曹魏，但始终未能改变三足鼎立的格局。曹魏后期的实权渐渐被司马懿掌控。263年，曹魏的司马昭发动魏灭蜀之战，蜀汉灭亡。两年后司马昭病死，其子司马炎废魏元帝自立，建国号为“晋”，史称西晋。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp公元280年，西晋灭东吴，统一中国，至此三国时期结束，进入晋朝时期。','孙吴',size-5);
    arrayListArcAndText.push(circle);

    x=820;
    y=540;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+25,y-70);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+25,y-70);
    arrayListLine.push(arrowLine);
    drawText('蜀汉',x,y,size-5)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp三国（220年－280年）是上承东汉下启西晋的一段历史时期，分为曹魏、蜀汉、东吴三个政权。赤壁之战时，曹操被孙刘联军击败，奠定了三国鼎立的雏型。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp220年，曹丕篡汉称帝，定都洛阳，国号“魏”，史称曹魏，三国历史正式开始。次年刘备称帝，定都成都，史称蜀汉。222年刘备在夷陵之战失败，孙权获得荆州大部。223年刘备去世，诸葛亮辅佐刘备之子刘禅与孙权重新联盟。229年孙权称帝，定都建邺，国号“吴”，史称东吴，至此三国正式成立。此后的数十年内，蜀汉诸葛亮、姜维多次率军北伐曹魏，但始终未能改变三足鼎立的格局。曹魏后期的实权渐渐被司马懿掌控。263年，曹魏的司马昭发动魏灭蜀之战，蜀汉灭亡。两年后司马昭病死，其子司马炎废魏元帝自立，建国号为“晋”，史称西晋。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp公元280年，西晋灭东吴，统一中国，至此三国时期结束，进入晋朝时期。','蜀汉',size-5);
    arrayListArcAndText.push(circle);

    x=950;
    y=450;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('西晋',x,y,size-3)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp西晋（265年 -316年），是中国历史上三国时期之后的统一王朝。另与东晋合称晋朝，传四帝 。从晋武帝建国开始，国祚51年；从灭东吴、统一全国始，为37年。为了区别于东晋，史称西晋，两晋又被称为司马晋。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp三国末期曹魏的大将军、太尉、太傅司马懿与二子司马师、司马昭都是权倾一时的权臣。司马昭死后，其子司马炎于265年取代曹魏政权而建立新政权，改国号为晋， [5]  定都洛阳。280年灭孙吴，结束了三国鼎立的分裂局面，重新统一全国。但灭吴后，西晋举国沉浸在奢侈腐败的气象之中。晋武帝出身世族，其家族经过长期发展，早就形成庞大的权贵集团。因此自西晋建立，政风十分黑暗，贪赃枉法，贿赂风行。西晋时期面临的外部局势是大量游牧部落内迁。关中和凉州的外族已占当地人口一半，这些外族被世族收作奴婢  。由于迁入人口数目相当多，与关中一带晋人相差不远。为西晋亡国和五胡十六国埋下伏笔。八王之乱后西晋元气大伤，内迁的诸民族乘机举兵，造成五胡乱华的局面，大量百姓与世族开始南渡。西晋是魏晋南北朝长期分裂时期中的短暂统一，所谓“昙花一现”。316年，西晋灭亡。次年，皇族司马睿在建康称帝，改元建武，史称东晋。 <br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp西晋时期以仿铸造青铜器的高温烧制的青瓷闻名。西晋的文化程度也很高，名医王叔和著有《脉经》，地理学家裴秀编有《禹贡地域图》，史学名著《三国志》即由陈寿所著。','西晋',size-3);
    arrayListArcAndText.push(circle);

    x=1050;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('东晋',x,y,size-3)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp东晋（317年－420年），是由西晋皇族司马睿南迁后建立起来的偏安政权。此外，史书中又仿东汉称中汉，称东晋为中晋，寓以晋室中兴之意；又东晋统治地区大部分在江东，古称江左，因此以江左代指东晋。 东晋是门阀士族政治，与北方的五胡十六国并存，这一历史时期又称东晋十六国。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp东晋时代，也曾经内部四分五裂。东晋与之前的孙吴以及其后的宋、齐、梁、陈，合称为六朝。东晋曾多次试图北伐，但由于内部不团结，除了最后篡晋的刘裕取得一定成果外，其余都无建树。祖逖本有希望恢复旧土，但他被司马睿挟制，郁郁而终。桓温的北伐则被慕容垂击败。太元八年（383年），前秦苻坚率兵南侵，东晋宰相谢安力主抗击，派谢石谢玄率军，在淝水之战大获全胜，苻坚只身逃回北方，南北分立之势从此而成。后有桓玄叛乱，废安帝，自立为天子，后为大将刘裕所平，拥恭帝，然大权落裕。元熙二年（420年），宋公刘裕废除晋恭帝，建立刘宋，东晋灭亡，中国历史进入南北朝时期。','东晋',size-3);
    arrayListArcAndText.push(circle);

    x=1150;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('刘宋',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'内容待更新','刘宋',size-6);
    arrayListArcAndText.push(circle);

    x=1250;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('南齐',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'内容待更新','南齐',size-6);
    arrayListArcAndText.push(circle);

    x=1350;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x+50,y-50);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+50,y-50);
    arrayListLine.push(arrowLine);
    line=new Line(x,y,x+50,y+50);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+50,y+50);
    arrayListLine.push(arrowLine);
    drawText('梁',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'内容待更新','梁',size-6);
    arrayListArcAndText.push(circle);

    x=1450;
    drawArc(x-35,y-60,r+1,color)
    drawArc(x-35,y-60,r-2)
    line=new Line(x-35,y-60,x+30,y-15);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x-35,y-60,x+30,y-15);
    arrayListLine.push(arrowLine);
    drawText('后梁',x-35,y-60,size-6)
    circle=new Circle(x-35,y-60,r-2,r+1,'内容待更新','后梁',size-6);
    arrayListArcAndText.push(circle);

    x=1450;
    drawArc(x-35,y+60,r+1,color)
    drawArc(x-35,y+60,r-2)
    line=new Line(x-35,y+60,x+30,y+15);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x-35,y+60,x+30,y+15);
    arrayListLine.push(arrowLine);
    drawText('陈',x-35,y+60,size-6)
    circle=new Circle(x-35,y+60,r-2,r+1,'内容待更新','陈',size-6);
    arrayListArcAndText.push(circle);

    x=1500;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('隋',x,y,size-3)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp公元581年二月，北周静帝禅让于杨坚，北周覆亡。隋文帝杨坚定国号为“隋”，定都大兴城（今西安）。隋文帝于公元589年南下灭陈朝，统一中国，结束了自西晋末年以来长达近300年的分裂局面，并励精图治，开创了开皇之治繁荣局面。公元604年，隋炀帝杨广即位后，营建并迁都洛阳（今河南洛阳），又修建了贯通南北的大运河，因内外举措过度消耗国力，引发隋末民变和贵族叛变。618年宇文化及等人发动兵变，杀隋炀帝；李渊亦逼隋恭帝杨侑禅让，建立唐朝。619年王世充拥立的皇泰主杨侗也被废，隋朝彻底灭亡，享国38年。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp隋朝在政治、经济、文化和外交等领域进行大刀阔斧的改革。政治初创三省六部制，完善于唐朝，巩固中央集权，正式推行科举制，选拔优秀人才，弱化世族垄断仕官的现象，另外建立政事堂议事制、监察制、考绩制，这些都强化了政府机制，根据南北朝的经验而改革政治，兴建了隋唐大运河以及驰道改善水陆交通线。在军事上继续推行和完善府兵制，经济上一方面实行均田制并改定赋役，减轻农民生产压力，另一方面采取大索貌阅和输籍定样等清查户口措施，以增加财政收入。隋朝出现万国来朝的局面。当时周边国家如高昌、倭国、高句丽、新罗、百济与东突厥等国皆深受隋朝文化与典章制度的影响，以日本遣隋使最为著名。','隋',size-3);
    arrayListArcAndText.push(circle);

    x=1500;
    drawArc(x,y-130,r+1,color)
    drawArc(x,y-130,r-2)
    line=new Line(x,y-120,x,y-30);
    line.drawWithArrowheads(cxt,Math.PI);
    arrowLine=new ArrowLine(x,y-120,x,y-30,Math.PI);
    arrayListLine.push(arrowLine);
    drawText('北周',x,y-130,size-6)
    circle=new Circle(x,y-130,r-2,r+1,'内容待更新','北周',size-6);
    arrayListArcAndText.push(circle);

    x=1500;
    y=230;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x,y+68);
    line.drawWithArrowheads(cxt,Math.PI);
    arrowLine=new ArrowLine(x,y,x,y+68,Math.PI);
    arrayListLine.push(arrowLine);
    line=new Line(x,y,x-80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x-80,y);
    arrayListLine.push(arrowLine);
    drawText('北魏',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp386年拓跋珪趁前秦四分五裂之际在牛川自称代王，重建代国，定都盛乐（今内蒙古呼和浩特市和林格尔县）。同年四月，改称魏王。398年六月，正式定国号为“魏” ，史称“北魏”。398年七月，道武帝拓跋珪迁都平城（今山西大同市），称帝。439年，太武帝拓跋焘统一北方。493年孝文帝拓跋宏迁都洛阳，大举改革。永熙三年（534年），分裂为东魏与西魏。东魏武定八年（550年），高洋废孝静帝，代东魏自立，北齐建立。西魏恭帝三年（557年）禅位于宇文觉，北周建立，元魏（拓跋魏）宣告结束。从386年拓跋珪重建代国至534年分裂为止，共历20帝（列入正史本纪者12位），享国148年。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp北魏时期，佛教兴起，佛教得到空前发展，迁都洛阳和移风易俗促进了北魏的中央集权与民族融合。','北魏',size-6);
    arrayListArcAndText.push(circle);

    x=1600;
    y=320;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x-80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x-80,y);
    arrayListLine.push(arrowLine);
    drawText('西魏',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp西魏（公元535年―公元556年），中国南北朝时期由北魏分裂出来的割据政权。由宇文泰拥立魏孝文帝的孙子元宝炬为帝，国号“大魏”。与高欢所掌控的东魏、南梁对立，建都长安（今西安汉长安城遗址）。政权实由宇文泰掌握。至公元557年被北周取代，经历两代三帝，历时二十二年。公元535年宇文泰毒死魏孝武帝元修后，拥立魏孝文帝的孙子南阳王元宝炬为帝，即魏文昭帝，改元大统，西魏开始。公元551年，元宝炬死，长子元钦嗣位。公元554年元钦被宇文泰所废，不久被毒死。元宝炬四子元廓即位，称元年，为了迎合宇文泰胡化运动而被迫改复姓拓跋。魏恭帝三年（556年），宇文泰病死，由侄宇文护承继。公元557年宇文护得将领支持，迫使魏恭帝禅让于宇文觉，西魏覆灭。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp在整个西魏统治时期，一直都由权臣宇文泰控制着政权，在他努力下，任用苏绰等人改革，采用和北攻南策，使西魏进一步强盛。甚至攻入南梁的成都，夺取南朝西川荆雍地盘。在北方经济逐渐恢复，人民安居乐业，且在三次战役中大败东魏大军，奠定北周统一中国北方和隋朝统一中国的基础。','西魏',size-6);
    arrayListArcAndText.push(circle);

    x=1400;
    y=230;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x,y+68);
    line.drawWithArrowheads(cxt,Math.PI);
    arrowLine=new ArrowLine(x,y,x,y+68,Math.PI);
    arrayListLine.push(arrowLine);
    drawText('东魏',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp东魏（公元534年―公元550年）北朝朝代之一，从北魏分裂出来的割据政权。建都邺（河北邯郸临漳西南），以洛阳为陪都。国土：今河南汝南、江苏徐州以北，河南洛阳以东的原北魏统治的东部地区，东魏历时十七年。公元534年，权臣高欢所立的皇帝北魏孝武帝元修不愿做傀儡皇帝，被迫投奔关陇军阀宇文泰。高欢暂时拥立元亶主持朝政，但回京后以辈分错乱为由废除元亶的权力，改拥立元亶的世子，年仅十一岁元善见为帝，即魏孝静帝，东魏开始。高欢掌权期间土地兼并情况严重，社会矛盾与民族矛盾尖锐，且屡败于劲敌西魏宇文泰。公元550年，孝静帝禅位于高欢之子高洋，东魏覆灭。','东魏',size-6);
    arrayListArcAndText.push(circle);

    x=1400;
    y=320;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('北齐',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'内容待更新','北齐',size-6);
    arrayListArcAndText.push(circle);

    x=1600;
    y=230;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x-80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x-80,y);
    arrayListLine.push(arrowLine);
    drawText('北燕',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'内容待更新','北燕',size-6);
    arrayListArcAndText.push(circle);

    x=1570;
    y=150;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x-50,y+60);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x-50,y+60);
    arrayListLine.push(arrowLine);
    drawText('十六国',x,y,size-9)
    circle=new Circle(x,y,r-2,r+1,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp十六国（304年-439年）是中国历史上的一段大分裂时期。该时期自304年李雄和刘渊分别在汉地巴蜀建立成国（成汉）、在中原建立汉赵（后称前赵）时起，至439年北魏拓跋焘（太武帝）灭北凉为止。十六国时期，汉地江南、荆湘地区有东晋控制，而汉地北部和西南部则先后建立了二十多个国家。其中的成汉、前赵、后赵、前凉、北凉、西凉、后凉、南凉、前燕、后燕、南燕、北燕、夏、前秦、西秦、后秦十六个国家实力强劲，北魏史学家崔鸿取其中十六个国家来代表这段时期，称这时期为“十六国”。范围大致上涵盖汉地中部、东部、西部，最远可达漠北及西域。','十六国',size-6);
    arrayListArcAndText.push(circle);

    x=1500;
    y=130;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x,y+80);
    line.drawWithArrowheads(cxt,Math.PI);
    arrowLine=new ArrowLine(x,y,x,y+80,Math.PI);
    arrayListLine.push(arrowLine);
    drawText('西凉',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'内容待更新','西凉',size-6);
    arrayListArcAndText.push(circle);

    x=1430;
    y=150;
    drawArc(x,y,r+1,color)
    drawArc(x,y,r-2)
    line=new Line(x,y,x+50,y+60);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+50,y+60);
    arrayListLine.push(arrowLine);
    drawText('北凉',x,y,size-6)
    circle=new Circle(x,y,r-2,r+1,'内容待更新','北凉',size-6);
    arrayListArcAndText.push(circle);

    x=1620;
    y=450;
    drawArc(x,y,r+13,color)
    drawArc(x,y,r+10)
    line=new Line(x,y,x+90,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+90,y);
    arrayListLine.push(arrowLine);
    drawText('唐',x,y,size+4)
    circle=new Circle(x,y,r+10,r+13,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp唐朝（618年—907年），是继隋朝之后的大一统中原王朝，共历二十一帝，享国二百八十九年。隋末天下群雄并起，617年唐国公李渊于晋阳起兵，次年称帝建立唐朝，以长安为京师。 658年置东都洛阳，后又陆续增置北都太原，南京成都、凤翔等都城。唐太宗继位后开创贞观之治，为盛唐奠定基础。唐高宗承贞观遗风开创“永徽之治”。690年，武则天改国号为周，705年神龙革命后，恢复唐国号。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp唐玄宗即位后缔造全盛的开元盛世。 天宝末全国人口达八千万左右。安史之乱后藩镇割据、宦官专权导致国力渐衰；中后期经唐宪宗元和中兴、唐武宗会昌中兴、唐宣宗大中之治国势复振。878年爆发黄巢起义破坏了唐朝统治根基，907年朱温篡唐，唐朝覆亡。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp唐朝时万国来朝达到鼎盛，向其朝贡之国多达三百余。 疆域空前辽阔，极盛时东起日本海、南据安南、西抵咸海、北逾贝加尔湖，是中国自秦以来第一个未修据胡长城的大一统王朝。&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<br>唐朝攻灭东突厥、薛延陀后，唐太宗被四夷各族尊为天可汗 。又借羁縻制度征调突厥、回鹘、铁勒、契丹、靺鞨、室韦等民族攻伐敌国，并让日本、南诏、新罗、渤海国等藩属国学习自身的文化与制度。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp唐朝接纳各国交流学习，经济、社会、文化、艺术呈现出多元化、开放性等特点 ，诗、书、画、乐等方面涌现出大量名家，如诗仙李白、诗圣杜甫、诗魔白居易，书法家颜真卿，画圣吴道子，音乐家李龟年等。唐朝是当时世界上最强盛的国家之一，声誉远播，与亚欧国家均有往来。唐以后海外多称中国人为“唐人”。','唐',size+4);
    arrayListArcAndText.push(circle);

    x=1735;
    y=450;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('后唐',x,y,size-6)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp后唐（923年—936年）是五代十国时期由沙陀族建立的封建王朝，定都洛阳（今河南洛阳），传二世四帝，历时一十四年。<br>后唐是五代十国时期统治疆域最广的朝代。“五代领域，无盛于此者”。“时梁晋吴蜀四分天下，后唐以一灭二，天下四分已得三分”。后唐疆域广阔，主要控制着中国北方地区，东接海滨，西括陇右、川蜀，北带长城，南越江汉；925年至933年，南方诸国除南吴、南汉外皆奉后唐正朔；930年，后唐控制国土到达极盛；有今豫、鲁、晋、冀、湘、渝诸省，陕、川、鄂之大部，宁、甘、黔各一部分，以及苏、皖淮北等地。','后唐',size-6);
    arrayListArcAndText.push(circle);

    x=1835;
    y=450;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('后晋',x,y,size-6)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp后晋（公元936年—公元947年）是中国历史上五代十国时期的一个朝代，从公元936年后晋高祖石敬瑭灭后唐开国，到契丹947年灭后晋，一共经历了两帝，十二年，另别称为石晋，初定都洛阳（今河南洛阳），后迁都开封（今河南开封）。后唐清泰三年（公元936年）夏，太原留守、河东节度使石敬瑭勾结契丹，认契丹皇帝耶律德光为父，并以幽云十六州为代价，在契丹扶持下于太原登基称帝，国号为晋，史称后晋。不久攻入洛阳，灭后唐，石敬瑭割地称儿的做法受到许多人的反对，包括他自己过去的亲信。石敬瑭死时，立侄石重贵为继承人。登基后，石重贵决定渐渐脱离对契丹的依附，他首先宣称对耶律德光称孙，但不称臣。公元944年契丹伐晋，双方在澶州（今河南濮阳南）交战，互有胜负。公元945年契丹再次南征，石重贵亲征，再次战败契丹。947年，契丹第三次南下，后晋重臣杜重威降契丹，这样后晋的主力就丧失了。石重贵被迫投降，全家被俘虏到契丹。后晋覆灭。后晋亡后，河东节度使北平王刘知远在太原称帝，建立后汉。','后晋',size-6);
    arrayListArcAndText.push(circle);

    x=1935;
    y=450;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+70,y+40);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+70,y+40);
    arrayListLine.push(arrowLine);
    drawText('辽',x,y,size-6)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp辽朝（公元916年—公元1125年）是中国历史上由契丹族建立的朝代，共传九帝，享国二百零九年。公元907年，辽太祖耶律阿保机成为契丹部落联盟首领，公元916年始建年号，建国号“契丹”，定都上京临潢府（今内蒙古赤峰市巴林左旗南波罗城）。947年，辽太宗率军南下中原，攻占汴京（今河南开封），耶律德光于汴京登基称帝，改国号为“大辽”，改年号为“大同” 。983年复更名“大契丹”。1007年辽圣宗迁都中京大定府（今内蒙古赤峰市宁城县）。1066年辽道宗耶律洪基复国号“辽”。公元1125年被金国所灭。辽强盛时期疆域东到日本海，西至阿尔泰山，北到额尔古纳河、大兴安岭一带，南到河北中部的白沟河。','辽',size-6);
    arrayListArcAndText.push(circle);

    x=2035;
    y=500;
    drawArc(x,y,r+8,color)
    drawArc(x,y,r+5)
    line=new Line(x,y,x,y+75);
    line.drawWithArrowheads(cxt,Math.PI);
    arrowLine=new ArrowLine(x,y,x,y+75,Math.PI);
    arrayListLine.push(arrowLine);
    line=new Line(x,y,x+70,y+35);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+70,y+35);
    arrayListLine.push(arrowLine);
    drawText('金',x,y,size-3)
    circle=new Circle(x,y,r+5,r+8,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp金朝（1115年-1234年），是中国历史上由女真族建立的统治中国北方和东北地区的封建王朝，完颜阿骨打所建。西与西夏、蒙古等接壤，南与南宋对峙。共传十帝，享国119年。金作为征服王朝，其部落制度的性质浓厚。初期采取贵族合议的勃极烈制度，后吸收辽朝与宋朝制度后，逐渐由二元政治走向单一汉制。军事上采行军民合一的猛安谋克制度，其铁骑兵与火器精锐，先后打败周边诸国。经济方面多继承自宋朝，陶瓷业与炼铁业兴盛，对外贸易的榷场还掌控西夏的经济命脉。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp金朝在文化方面也快速汉化，杂剧与戏曲在金朝得到相当的发展，金代院本为后来元曲的杂剧打下了基础。金朝鼎盛时期统治疆域包括今天的中国大陆秦岭淮河以北华北平原、东北地区和俄罗斯联邦的远东地区，疆域辽阔。金是历史上第一次提出了“中华一统”的朝代。','金',size-3);
    arrayListArcAndText.push(circle);

    x=1935;
    y=550;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+70,y-40);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+70,y-40);
    arrayListLine.push(arrowLine);
    drawText('北宋',x,y,size-6)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp北宋（960—1127年）是中国历史上继五代十国之后的朝代，传九位皇帝，享国167年。与南宋合称宋朝，又称两宋，因皇室姓赵，也称赵宋。显德七年（960年），后周诸将发动陈桥兵变，拥立赵匡胤为帝，建立宋朝，定都东京开封府（河南开封），改元建隆。后通过杯酒释兵权，将兵权与财政权集中于中央，避免了中晚唐藩镇割据的乱象。但也导致宋朝与辽国、西夏、金国的战争中失利。靖康元年（1126年）发生靖康之难，次年被金国灭亡。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp北宋疆域东北以今海河、河北霸州、山西雁门关为界；西北以陕西横山、甘肃东部、青海湟水为界；西南以岷山、大渡河为界。宋神宗时通过熙河开边收复河湟，宋徽宗时期于青海北部置陇右都护府，并重金赎回幽云七州。宋朝政治体制大体沿袭唐朝，采用分化事权方式，宰相职位由多人担任，还实行官衔与实际职务分离的官吏任用制度，这些对维护国家统一，起了重要的作用，也造成了“积贫积弱”的局面。','北宋',size-6);
    arrayListArcAndText.push(circle);

    x=1835;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('后周',x,y,size-6)
    circle=new Circle(x,y,r,r+3,'内容待更新','后周',size-6);
    arrayListArcAndText.push(circle);

    x=1735;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('后汉',x,y,size-6)
    circle=new Circle(x,y,r,r+3,'内容待更新','后汉',size-6);
    arrayListArcAndText.push(circle);

    x=2035;
    y=600;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x+70,y-35);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+70,y-35);
    arrayListLine.push(arrowLine);
    drawText('南宋',x,y,size-6)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp南宋（1127－1279年），中国历史上的朝代，北宋覆亡后，赵构在南京应天府（今河南商丘）称帝， 与北宋统称为宋朝，共传五世九帝，享国一百五十二年。公元1127年，靖康之变后，宋徽宗第九子康王赵构幸免于难，定都南京应天府，国号仍为宋，史称南宋。公元1138年，宋室迁都临安府（今浙江杭州）。公元1141年，宋、金达成绍兴和议，南宋放弃淮河以北地区，双方以淮河-大散关为界。此后，金国几度南下都未能消灭南宋，南宋数次北伐也无功而返，双方逐渐形成对峙局面。南宋中后期，政治腐败，奸臣辈出，漠北草原的蒙古部开始崛起。1234年宋蒙联合灭金。1235年蒙古入侵南宋，南宋军民拼死抵抗，直到1276年临安府被攻占，1279年崖山海战宋军战败，陆秀夫背着宋末帝赵昺跳海而亡，南宋覆灭。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp南宋在政治、军事等诸多领域都沿袭北宋。在中央地方权力、官僚机构、司法、军权等方面加强中央集权的一系列措施，军事上在招收溃兵和勤王之军等基础上，开始军事重建之路，最终形成几支较强大的军事力量，于是有了岳家军、韩家军的出现。南宋虽偏安于秦岭淮河以南，却是中国历史上经济、文化昌盛，对外开放程度较高的王朝。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp南宋灭亡的直接原因是漠北游牧民族对宋朝农业生产关系的毁灭性打击。','南宋',size-6);
    arrayListArcAndText.push(circle);

    x=2135;
    y=550;
    drawArc(x,y,r+8,color)
    drawArc(x,y,r+5)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('蒙古帝国',x,y,size-9)
    circle=new Circle(x,y,r+5,r+8,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp蒙古帝国（Mongol Empire），是在13世纪由蒙古乞颜部铁木真建立的的政权。包括元朝、钦察汗国、察合台汗国、伊儿汗国和窝阔台汗国，广义的蒙古帝国还包括之后的北元和其他蒙古政权。铁木真于1206年在斡难河河源建立，尊汗号为成吉思汗，国号大蒙古国。大蒙古国建立后屡次对外侵略扩张，成吉思汗在位时开始征伐西夏、西辽、金国、花剌子模等国，其继承人又经过两次大规模的西征，至1259年蒙哥汗去世时，蒙古帝国已占据包括漠北、华北、东北、西藏、西域、中亚、西亚、东欧等在内的辽阔地域。1260年，蒙古帝国由于忽必烈和阿里不哥争位而走向分裂，蒙古帝国随之解体。1264年忽必烈夺得汗位后，原属蒙古帝国的术赤后王封地、察合台后王封地、窝阔台后王封地和忽必烈之弟旭烈兀的封地取得了事实上的独立地位。分别成立钦察汗国、察合台汗国、伊儿汗国、窝阔台汗国，后蒙古人建立的政权被西方统称为“蒙古帝国”。271年，忽必烈依据汉法，建国号“大元”，自此蒙古帝国改称为“大元大蒙古国”。四大汗国直至1304年元成宗时期方才一同承认元朝的宗主地位。元廷又在1310年元武宗时期与察合台汗国瓜分了窝阔台汗国，取得漠西领地。后元顺帝被明朝于1368年逐出汉地，元廷逃往漠北，史称“北元”。北元亡于1402年 ，其后中国的明朝长期和漠北的鞑靼、瓦刺、吐鲁番等汗国并存，直到17世纪蒙古帝国漠南蒙古被清朝囊括。','蒙古帝国',size-9);
    arrayListArcAndText.push(circle);

    x=2135;
    y=450;
    drawArc(x,y,r+3,color)
    drawArc(x,y,r)
    line=new Line(x,y,x,y+70);
    line.drawWithArrowheads(cxt,Math.PI);
    arrowLine=new ArrowLine(x,y,x,y+70,Math.PI);
    arrayListLine.push(arrowLine);
    drawText('西夏',x,y,size-6)
    circle=new Circle(x,y,r,r+3,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp西夏（1038年—1227年），是中国历史上由党项人在中国西北部建立的一个政权，自称邦泥定国或白高大夏国、西朝。因其在西方，宋人称之为西夏。前期和辽、北宋，后期与金朝并立。历经十帝，享国189年。从881年李思恭拜定难军节度使起，李氏政权共计346年。西夏疆域范围在今宁夏、甘肃、青海东北部、内蒙古西部以及陕西北部地区，占地两万余里。对外关系上，表面对辽宋金称臣，实则对内独立称帝。前期与辽和北宋经常发生战事，保持三国鼎立的局面，后期与金并立，末期受蒙古的威胁。','西夏',size-6);
    arrayListArcAndText.push(circle);

    x=2250;
    y=550
    drawArc(x,y,r+13,color)
    drawArc(x,y,r+10)
    line=new Line(x,y,x+85,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+85,y);
    arrayListLine.push(arrowLine);
    drawText('元',x,y,size+4)
    circle=new Circle(x,y,r+10,r+13,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp元朝(1271年－1368年), 汉语国号全称为大元，蒙古语国号全称大元也克蒙古兀鲁思，是中国历史上由蒙古人所建立的大一统王朝。1260年，忽必烈称帝，自立为第五代大蒙古国大汗，后于1271年取儒士刘秉忠建议，定汉文国号为“大元”，改蒙古语国号大蒙古国为大元大蒙古国，定都于汉地大都（今北京市），建立元朝。1279年元军彻底攻灭南宋残余势力，一统中国并结束南宋与金朝南北政权对峙之局面。虽然传统以南宋为正统王朝，由于金朝认为已继承宋朝正统，有一说认为元朝继承金朝正统，并选取根据五行相生顺序生自金朝“土”德的“金”德为王朝德运，同时选取与金德对应的白色为王朝正色。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp元朝的基础为乞颜部族的首领铁木真于1206年统一漠北诸部族后建立的大蒙古国，铁木真被称为“成吉思汗”。当时蒙古诸部受金朝统辖，然而由于金朝与西夏均走向衰落，成吉思汗先后攻打西夏与金朝，并于公元1227年8月攻灭西夏、1234年3月攻灭金朝，取得中国华北地区和黄土高原地区。同一时间，大蒙古国在西方不断扩张，先后发动三次西征，形成称霸欧亚大陆的国家，被欧洲称为蒙古帝国（Mongol Empire）。1259年，第四代蒙古大汗蒙哥（拖雷长子）于征伐南宋的战争中去世后，领有汉地、主张汉化、陪同主持对南宋战争的忽必烈（拖雷第四子）与受漠北蒙古贵族拥护的阿里不哥（拖雷第七子）为了争夺汗位而发生战争，最后忽必烈于1264年获胜，而蒙古帝国也宣告彻底地分裂。自元太宗窝阔台去世以来，蒙古四大汗国先后自立，而忽必烈对于“蒙古大汗”称号的继承也没有得到蒙古诸部的一致承认。','元',size+4);
    arrayListArcAndText.push(circle);

    x=2370;
    drawArc(x,y,r+8,color)
    drawArc(x,y,r+5)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('明',x,y,size-3)
    circle=new Circle(x,y,r+5,r+8,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp明朝（1368年―1644年），是中国历史上一个由汉族建立的王朝，初期建都南京，明成祖时期定都北京。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp传十六帝，共计276年。元末爆发红巾起义，朱元璋加入郭子兴队伍。1364年称吴王，史称西吴。1368年初称帝，国号大明，定都于应天府；1420年朱棣迁都至顺天府，以南京为陪都。明初历经洪武之治、永乐盛世、仁宣之治等治世，政治清明、国力强盛。中期经土木之变由盛转衰，后经弘治中兴、万历中兴国势复振。晚明因政治腐败、东林党争和天灾外患导致国力衰退。爆发农民起义。1644年李自成攻入北京，崇祯帝自缢，明朝灭亡。明朝宗室在南方建立了多个政权，史称南明。清兵入关后，陆续击败弘光、隆武、绍武等诸政权。1662年永历帝被杀，南明覆灭。1683年，清军攻占台湾，奉明正朔的明郑覆灭。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp明代疆域囊括汉地，东北抵日本海、外兴安岭15，后缩至辽河流域；北达阴山，后撤至明长城；西至新疆哈密，后退守嘉峪关；西南到达缅甸和暹罗北境，后折回约今云南境；并在青藏地区设有羁縻卫所，还曾收复安南。明朝时期君主专制空前加强，多民族国家也进一步统一和巩固。明初废丞相、设立厂卫特务机构，加强了专制主义中央集权，但同时也为中后期宦官专政埋下伏笔。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp明朝时期农民反封建斗争也进入了一个新阶段。明朝时期君主专制空前加强，多民族国家也进一步统一和巩固。明初废丞相、设立厂卫特务机构，加强了专制主义中央集权，但同时也为中后期宦官专政埋下伏笔。明朝时期农民反封建斗争也进入了一个新阶段。','明',size-3);
    arrayListArcAndText.push(circle);

    x=2485;
    drawArc(x,y,r+8,color)
    drawArc(x,y,r+5)
    line=new Line(x,y,x+80,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+80,y);
    arrayListLine.push(arrowLine);
    drawText('清',x,y,size-3)
    circle=new Circle(x,y,r+5,r+8,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp清朝是中国历史上由满人建立的一个帝国、也是最后一个专制王朝，统治者为建州女真的爱新觉罗氏。其最早前身为1616年努尔哈赤在满洲建立的后金，1636年皇太极称帝后改定国号为“大清”，1644年藉协助明朝军队平定民变的名义进军中国本土，彻底消灭明朝后统治整个中国，直至1912年中华民国建立后结束。自1644年入主中原，建立清朝以来，共经历10位皇帝，历时268年。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp从清军入关到其后的数十年时间内，清朝陆续消灭华北残余明朝势力、李自成的大顺军、张献忠的大西国、南明和明郑等势力，统一中国全境。历经康熙、雍正及乾隆三帝，清朝的综合国力及经济文化逐步得到恢复和发展，建立庞大的领土与藩属国，史称康雍乾盛世，是清朝发展的高峰时期。','清',size-3);
    arrayListArcAndText.push(circle);

    x=2600;
    drawArc(x,y,r+15,color)
    drawArc(x,y,r+10)
    line=new Line(x,y,x+110,y);
    line.drawWithArrowheads(cxt);
    arrowLine=new ArrowLine(x,y,x+110,y);
    arrayListLine.push(arrowLine);
    drawText('中华民国',x,y,size-6)
    circle=new Circle(x,y,r+10,r+15,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp中华民国（1912-1949），位于亚洲东部、东临太平洋。是辛亥革命以后建立的亚洲第一个民主共和国，简称民国。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp1911年辛亥革命爆发后，革命党在南京建立临时政府，各省代表推举孙中山为临时大总统，1912年元月民国正式建立。以袁世凯为首的北洋势力主政中国，北洋政府分崩离析后政局动荡不安，孙中山南下广州，召开国民党一大，建立黄埔军校随而建立国民政府，促成国共合作后的孙中山不久病逝。1926年蒋介石继承孙中山遗志领导国民北伐，意欲统一中国，到1928年东北易帜，国民政府从形式上统一中国，蒋介石成为继孙中山之后的国民党领袖。统一之后，民国进入所谓的“黄金十年”建设时期，此间社会稳定，教育稳步发展、趋于定型。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp1937年抗战全面爆发，中国成为反法西斯同盟国，国际地位大大提高，一举成为美英中苏四大国。1949年后因国共内战失利，中华民国时期结束。','中华民国',size-6);
    arrayListArcAndText.push(circle);

    x=2780;
    drawArc(x,y,r+53,color)
    drawArc(x,y,r+47)
    drawText('中华人民共和国',x,y,size-6)
    circle=new Circle(x,y,r+47,r+53,'&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp中华人民共和国，简称“中国”，成立于1949年10月1日，位于亚洲东部，太平洋西岸 ，是工人阶级领导的、以工农联盟为基础的人民民主专政的社会主义国家。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp中国陆地面积约960万平方千米，东部和南部大陆海岸线1.8万多千米，内海和边海的水域面积约470多万平方千米。海域分布有大小岛屿7600多个，其中台湾岛最大，面积35798平方千米 。中国同14国接壤，与8国海上相邻。省级行政区划为23个省、5个自治区、4个直辖市、2个特别行政区。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp中国是世界上历史最悠久的国家之一，有着光辉灿烂的文化和光荣的革命传统，世界遗产数量全球领先 。1949年新中国成立后，进入社会主义革命和建设时期，1956年实现向社会主义过渡，此后社会主义建设在探索中曲折发展 。“文化大革命”结束后实行改革开放，沿着中国特色社会主义道路，集中力量进行社会主义现代化建设。经过长期努力，中国特色社会主义进入了新时代。<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp中国是世界上人口最多的发展中国家，国土面积居世界第三位 ，是世界第二大经济体，并持续成为世界经济增长最大的贡献者，2018年经济总量突破90万亿元。中国坚持独立自主的和平外交政策，是联合国安全理事会常任理事国，也是许多国际组织的重要成员，被认为是潜在超级大国之一。','中华人民共和国',size-6);
    arrayListArcAndText.push(circle);
}

function drawArcTextAndLine(dx,dy) {
    clearCanvas();
    for(var j=0;j<arrayListLine.length;j++){
        arrayListLine[j].sx+=dx;
        arrayListLine[j].sy+=dy;
        arrayListLine[j].ex+=dx;
        arrayListLine[j].ey+=dy;
        line=new Line(arrayListLine[j].sx,arrayListLine[j].sy,arrayListLine[j].ex,arrayListLine[j].ey);
        if(arrayListLine[j].radius>0) line.drawWithArrowheads(cxt,Math.PI);
        else line.drawWithArrowheads(cxt);
    }
    for(var i=0;i<arrayListArcAndText.length;i++){
        arrayListArcAndText[i].x+=dx;
        arrayListArcAndText[i].y+=dy;
        drawArc(arrayListArcAndText[i].x,arrayListArcAndText[i].y,arrayListArcAndText[i].rectRadius,arrayListArcAndText[i].color)
        drawArc(arrayListArcAndText[i].x,arrayListArcAndText[i].y,arrayListArcAndText[i].radius)
        drawText(arrayListArcAndText[i].text,arrayListArcAndText[i].x,arrayListArcAndText[i].y,arrayListArcAndText[i].size)
    }    
}

c.addEventListener('click',function(e){
    var point=getEventPosition(e);
    var flag=false;
    for(var i=0;i<arrayListArcAndText.length;i++){
        if(Math.pow(point.x-arrayListArcAndText[i].x,2)+Math.pow(point.y-arrayListArcAndText[i].y,2)<=Math.pow(arrayListArcAndText[i].radius,2)){            
            ccc.innerHTML=arrayListArcAndText[i].content;
            ccc.style.display='block';
            flag=true;
        }
    }
    if(!flag) ccc.style.display='none';
},false)

c.addEventListener('mousedown',(e) => {
    var point=getEventPosition(e);
    startX=point.x;
    startY=point.y;
    isDragging=!isDragging;
},false)

c.addEventListener('mousemove',(e) => {
    if(isDragging){
        var point=getEventPosition(e);
        var dx=point.x-startX;
        var dy=point.y-startY;
        startX=point.x;
        startY=point.y;
        drawArcTextAndLine(dx,dy);
    }    
})

c.addEventListener('mouseup',(e) => {
    isDragging=!isDragging;
    //var point=getEventPosition(e);
    //startX=point.x;
    //startY=point.y;
})

function clearCanvas() {
    cxt.clearRect(0,0,c.width,c.height);
}


function getEventPosition(ev){
    var x, y;
    if (ev.layerX || ev.layerX == 0) {
      x = ev.layerX;
      y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      x = ev.offsetX;
      y = ev.offsetY;
    }
    return {x: x, y: y};
}
//注：使用上面这个函数，需要给Canvas元素的position设为absolute。