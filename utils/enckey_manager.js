'user strict';

// encrypt key manager ( 뼈대만 잡음 - 코딩을 위해서, 현종님이 완료 해주실 예정 )

/**
 *
 * @param apikey[string] api 키를 기준으로 암호화 토큰을 관리 한다.
 * @param isCreate[boolean] 만약 저장된 키가 없다면 만들어야 할지 말아야 할지에 대한 변수 ( true는 생성 후 리턴, false 는 null 리턴)
 * @param cb		Async 하게 만들기 위한 결과 받는 callback, function( token ); 형태를 갇는다. 
 */
exports.getEncToken = function( apikey, isCreate, cb ) {
  
  	// 일단 무조건 고정 키 리턴
  	cb( "urqa_service_NumberONE!!!" );
	

	//return "urqa_service_NumberONE!!!";

}
