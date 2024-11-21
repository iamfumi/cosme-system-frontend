//populate the score element

function populateScoreElement(inputData){ //データを入力した時にスコアを表示
	var i = 0;
	for (j=0; j<=9; j++){
		$("#score"+i).text("★ ".repeat(inputData.evScore[i]));
		//$("#score"+i).text(inputData.evScore[i]);
		i+=1;
	//TODO
	}
}

function populateTagElement(inputData){ //データを入力した時にタグを表示・非表示
	var i = 0;
	for (j=0; j<=9; j++){

		if(inputData.tags[i]) //タグを表示
		{
			$("#tag"+i).text(inputData.tags[i]);
			$("#tag"+i).show();
		}
		else //タグを隠す
		{
			$("#tag"+i).hide();
		}
		i+=1;
	}
	//TODO
}

var delay = (function(){ //delayという関数で以下を処理する
  var timer = 0; //タイマーを0
  return function(callback, ms){ //functionを実行する //ms:3000(3秒のこと)
  clearTimeout (timer); //過去の3秒の実行命令をキャンセルする(=0にする)
  timer = setTimeout(callback, ms); //新たな3秒の実行命令を行う
 };
})();

//run on load
$(function(){

	//hide all unknown qualities on start
	$(".scoreAnswer,.tagAnswer").hide();

	//when clicking the submit button
$("#reviewInputText").keyup(function()//keyup:何かアクションを起こしたら以下を実行
//$("#sendReview").click(function()
	{

		delay(function(){

		//alert("Test");
		//put in the loader screen
		$(".blackScreen").fadeIn("slow");
     //alert($("#reviewInputText").val());
		 $.ajax({
			type:"post",
			// url:"http://localhost:5000/getScore",        // POST送信先のURL
			url:"https://cosme-system-backend.onrender.com/getScore",
			data: {"rev":$("#reviewInputText").val()},  // JSONデータ本体
			dataType: "json",           // レスポンスをJSONとしてパースする
			success: function(data) {   // 200 OK時 //成功した時に起こすアクションを以下に示す
			  //alert( JSON.stringify(data.data)); //アラートで結果を表示
			  $(".blackScreen").fadeOut("slow");
			  $(".scoreAnswer,.tagAnswer").show();
		    populateScoreElement(data.data);
			  populateTagElement(data.data)
			},
			error: function() {         // HTTPエラー時 //成功しなかった時に起こすアクションを以下に示す
			alert("Server Error. Pleasy try again later.");
			  $(".blackScreen").fadeOut("slow");
			},
      always: function(){ //ずっとローディングしてる時などに元に戻す
			    $(".blackScreen").fadeOut("slow");
			}
		});
　　　　 }, 1000 );
	});

});
