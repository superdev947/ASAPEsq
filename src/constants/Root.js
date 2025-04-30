export const Root = {
  baseurl: 'http://capp.strandwebsites.com/contractor_app/index.php/',

  // baseurltherapy:'https://therapytracker.net/admin/therepy_api/',
  // Authorization:'Basic YWRtaW46MTIzNA==',
  // xapikey:'test@123',
  // apiPass:'1234'
  googleMapApiKey: "AIzaSyBQjTfzE_m26y8-jSYTVPvwbkuebEUOCTM",

  paymentSuccess: 'http://capp.strandwebsites.com/contractor_app/payment/success',
  paymentError: 'http://capp.strandwebsites.com/contractor_app/payment/error',
  paypalClientID: "Ab_sua-SGgIfvonJICzjNwSfx9aCVhgNSYYD9C3PSEbg6LL5AEJybTSTxcajm58OLGEjAfVnui6VHq1E",
  paypalSecret: "EO54heHy-JMe9jF1XiKTabbT_34H72QwGJY8U4H-IGl3felAOhbx-z2tPfLK9nRzEOMGiEt_iX2Qu3e7",

  //*End URL
  login_EndURL: 'web_service/login',
  social_EndURL: 'web_service/social_login',
  forgetpassword_EndURL: 'web_service/forgot_password',
  support_FAQ_EndURL: 'web_service/supportFaqDetails',


  /* Attorney End URL*/
  attorney_signup_EndURL: 'web_service/contractor_registration',
  attorney_profileDetail_EndURL: 'web_service/contractor_profile_details',
  attorney_DeleteAccount_EndURL: 'web_service/delete_contractor_record',
  attorney_UpdatePassword_EndURL: 'web_service/change_contractor_password',
  attorney_updateProfile_EndURL: 'web_service/update_contractor_profile',
  attorney_messageList_EndURL: 'web_service/messageList',
  attorney_chatHistory_EndURL: 'web_service/chatHistory',
  attorney_sendMessage_EndURL: 'web_service/messageInformation',
  attorney_Myrequest_EndURL: 'web_service/attorneyUpcomingOrPast',
  attorney_pendingRequestLoad_EndURL: 'web_service/requestList',
  attorney_UpdateAttorneyLocation_EndURL: 'web_service/updateAttorneyLocation',
  attorney_AcceptDecline_EndURL: 'web_service/accept_decline',
  attorney_StartTask_EndURL: 'web_service/start_task',
  attorney_UpdateStatus_EndURL: 'web_service/update_status',

  /* Client End URL*/
  client_signup_EndURL: 'web_service/client_registration',
  client_getRequestType_EndURL: 'web_service/getCategories',
  client_fetchCardsData_EndURL: 'web_service/cardList',
  client_DefaultCard_EndURL: 'Web_service/default_card',
  client_DeleteCard_EndURL: 'Web_service/delete_card',
  client_AddCard_EndURL: 'Web_service/payment',
  client_profileDetail_EndURL: 'web_service/client_profile_details',
  client_DeleteAccount_EndURL: 'web_service/delete_client_record',
  client_UpdatePassword_EndURL: 'web_service/change_client_password',
  client_updateProfile_EndURL: 'web_service/update_client_profile',
  client_MyRequestLoad: 'web_service/upcomingOrpast',
  client_Request_EndURL: 'web_service/request_type',
  client_Cancel_Request_EndURL: 'web_service/cancel_request',
  client_Tips_Infomation_EndURL: 'web_service/tipsInformation',
  client_Rating_EndURL: 'web_service/receiptInformation',
  client_RetainerAgreement_EndURL: 'web_service/retainerAgreement',
  client_Rating_Attorney_EndURL: 'web_service/ratingToAttorney',
}