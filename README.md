# 网页设计科 毕业作品 学生评价点数展示系统
- <font color=red>**本项目请配合 [学生评价系统](https://huucat.github.io/evaluation_system/#/) 使用**</font>
- <font color=red>**本项目使用google服务器，请确保您的设备能够连接至google服务器**</font>

</br>

## 起步

    $ git clone https://github.com/Huucat/display_system.git
    $ cd display_system
    $ npm install
    $ npm run serve

</br>

## 项目介绍

- 项目使用WebPack构建。
- 程序主体采用JavaScript和HTML5 Canvas的Pixiv.js框架。
- 数据库和前后交互使用 Google Firebase 实现。
- 本项目为网页设计科的毕业作品展会当天所有参展学生评价点数展示系统。
- 展会当天所有来展的企业、学生家长等，均可使用该系统，查看该学生的自我介绍、毕业作品名称及获得的评价成绩，所属社团、社团介绍。</br>
- 通过该系统大致可知学生性格、毕业作品、毕业展会当天活跃度等信息。
</br>

## 主题介绍

- 本项目主题为【宇宙观测】，每个学生作为一颗【恒星】在星座(学科社团/作品团队)中闪耀。来场参观人员可通过本系统，驾驶宇宙飞船，去查看每个学生详情。
- 每颗恒星拥有4颗行星环绕，这4颗行星从内到外分别代表：【企划】【设计】【编程】【发表】四种能力。
- 通过 **[学生评价系统](https://huucat.github.io/evaluation_system/#/)** 可以获得点数，这4颗行星将根据获得的评价点数逐渐长大。
- 恒星共有4种颜色，分别为：</br>
  **<font color=#FFF390>黄色（企划能力）</font>**</br>
  **<font color=#FF99FF>粉色（设计能力）</font>**</br>
  **<font color=#99CCFF>蓝色（编程能力）</font>**</br>
  **<font color=#AAFFAA>绿色（发表能力）</font>**</br>
  当某种能力获得的评价点数最高时，恒星将会变成相对应的颜色
- 推荐分辨率1920*1080，浏览器按F11全屏展示
</br>

## 各页面介绍

### 1、星座一览
![星座一览](https://raw.githubusercontent.com/Huucat/display_system/master/READMEIMG/%E4%B8%BB%E9%A1%B5.png)

星座一览页面展示了所有星座，即本学科所有社团/作品团队，通过该页面可总览全部星座形状，得知恒星大小（团队所得评价分数高低）。鼠标按下左右滑动可旋转页面。

### 2、星座详情
![星座详情](https://raw.githubusercontent.com/Huucat/display_system/master/READMEIMG/%E6%98%9F%E5%BA%A7.png)

星座详情页面展示了该星座的所有恒星，星座图案为这个社团/作品的主题，右上角按钮点击后可查看介绍。点击一颗恒星即可查看当前恒星详细信息。

### 3、恒星观察
![恒星观察](https://raw.githubusercontent.com/Huucat/display_system/master/READMEIMG/%E6%81%92%E6%98%9F.png)

恒星观察页面可查看当前恒星名称，4个行星大小，得分最高的项目将有一个三角形标识。通过右下角三个按钮，可分别查看【个人情报】【所属】【推荐】三个页面

### 4、个人情报
![个人情报](https://raw.githubusercontent.com/Huucat/display_system/master/READMEIMG/%E6%83%85%E6%8A%A5.png)

个人情报页面，可以查看当前学生的毕业作品名称；自己对自己的评价标签；他人对自己的评价标签（这个标签可以从评价系统中添加）；

### 5、所属星座
![所属星座](https://raw.githubusercontent.com/Huucat/display_system/master/READMEIMG/%E6%89%80%E5%B1%9E.png)

所属星座页面，可查看当前学生的恒星分别处在哪些星座当中。点击星座，即可前往该星座查看。

### 6、好友推荐
![所属星座](https://raw.githubusercontent.com/Huucat/display_system/master/READMEIMG/%E6%8E%A8%E8%8D%90.png)

好友推荐页面。可以查看当前学生所推荐的最多4名好友，及推荐理由。选择后点击观测按钮，即可前往该学生的行星查看。

## 系统结构
![所属星座](https://raw.githubusercontent.com/Huucat/display_system/master/READMEIMG/%E7%B3%BB%E7%BB%9F%E6%9E%84%E9%80%A0.jpg)