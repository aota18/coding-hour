

function testID(id) {

    /*
      ID는 무조건 영어 + 숫지
      length 4~ 15사이
      return bool
    */    

    if(id.length > 15 || id.length < 4  ){
      return false;
    }

    for(var i = 0; i < id.length; i++){
        //number 48~ 57  enlgish Da 65~90 so 97~ 122
      if (id.charCodeAt(i) >57 || id.charCodeAt(i) < 48   ){
        if(id.charCodeAt(i) < 65 || id.charCodeAt(i) > 90){
          if(id.charCodeAt(i) < 97 || id.charCodeAt(i) >122){
            return false;
          }
        }
      }
    }
    

    return true;
  }

function testEmail(email){
  /*
    handong email form only
  */

  var mailId =email.split('@');

  if(mailId.length != 2){
    return false;
  }

  if(!testID(mailId[0])){
    return false;
  }

  if(mailId.indexOf('handong.edu') < 0){
    return false;
 }
 

return true;


}

function testPWD(password){

}
function testArticle(article){
  /*
  no more than 100 words
  */


}



module.exports = {testID,testEmail};









