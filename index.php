<!DOCTYPE html>
<html>
<head>
	<title>Tìm hiểu Google Maps APIs</title>

	<meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="stylemap.css">
 
<!-- Favicon ico -->
  <link rel="shortcut icon" href="favicon.ico"> 
  
  <script type="text/javascript" src="jquery-3.2.1.min.js"></script>
 	<script src="MapJs.js"></script>


<!-- Ẩn hiện right-panel -->
  <script>
  	$(document).ready(function(){

      $("input[value='hien']").click(function(){
        $("#right-panel").show();
      })
      $("input[value='an']").click(function(){
        $("#right-panel").hide();
      })
    })
	</script>
 
<!-- Ẩn hiện Dialog chỉ đường -->
  <script>
    $(document).ready(function(){
      $('#imgg').click(function(){
         $('.Dialog').slideToggle();            
      });
    })
  </script>
</head>

<body>
<!-- Tìm kiếm với SearchBox -->
	<input id="pacinput" class="controls" type="text" placeholder="Tìm kiếm trên Google Maps">

<!-- Dialog chỉ đường với 2 SearchBox -->
  <div class="Dialog" id = "Dialogg">
    <input id="position1" class="ipDirect" type="text" placeholder="Chỉ đường từ" ><br>
    <input id="position2" class="ipDirect" type="text" placeholder="Chỉ đường đến"><br>
    <input id="btDirect" class="btDirect" type="button" value="Chỉ đường">
    <div id = "buttonStyle" >
      <div class="hide-show-panel"><input  type="radio" name="abc" value="hien" checked  > Chi tiết  <input type="radio" name="abc" value="an" > Đóng </div>
    </div>
  </div>


<!-- Tìm kiếm theo khu vực -->
  <div class="find">
      <select class="select-find" id="country">
        <option selected>Chọn địa điểm</option>
        <option value="hn">Hà Nội</option>
        <option value="hp">Hải Phòng</option>
        <option value="tb">Thái Bình</option>
        <option value="na">Nghệ An</option>
        <option value="tth">Thừa Thiên Huế</option>
        <option value="dn">Đà Nẵng</option>
        <option value="kh">Khánh Hòa</option>
        <option value="ld">Lâm Đồng</option>
        <option value="hcm">TP Hồ Chí Minh</option>
        <option value="vt">Vũng Tàu</option>
        <option value="dt">Đồng Tháp</option>
        <option value="bt">Bến Tre</option>
        <option value="ct">Cần Thơ</option>
        <option value="st">Sóc Trăng</option>
        <option value="cm">Cà Mau</option>
        <option value="bt">Bến Tre</option>
      </select>
      <select class="select-find" id="choose">
        <option value="atm">Chọn dịch vụ</option>
        <option value="atm">ATM</option>
        <option value="bank">Ngân hàng</option>
        <option value="cafe">Cafe</option>
        <option value="hospital">Y tế</option>
        <option value="museum">Nhà bảo tàng</option>
        <option value="park">Công viên</option>
        <option value="university">Giáo dục</option>
        <option value="zoo">Sở thú</option>
        <option value="hotel">Khách sạn</option>
        <option value="gym">Gym</option>
        <option value="convenience_store">Cửa hàng tiện ích</option>
      </select>
    <div class="find-img">
        <input type="image" id="findbt" name="findbt" src="search-icon.png" width="32px" height="32px" title="Tìm kiếm">
    </div>
  </div>
     
<!-- Thông tin chi tiết chỉ đương -->
 	<div id="right-panel"></div> 
	
	<div id = "map"></div>
	
<!-- Img chỉ đường -->
  <div id = "icondirection">
    <img src="direction.png" id="imgg" width="30px" height="30px" title="Chỉ đường">
  </div>	

<!-- Img vị trí hiện tại -->
	<div id = "iconLocation">
    <div id="mylocation"><img src="mylocation.png" width="27px" height="27px" title="Vị trí của tôi"></div>
	</div>	

  <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhi4xY6tcE_PIJWRXk_U9h3CUFTgBC8Go
    &libraries=places&callback=initMap"></script>

</body>
</html>