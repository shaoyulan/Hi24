
public class MainClass {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SMSSoapService sms =new SMSSoapService();
		String userID="0963139051";	//�b��
		String password="1qaz";	//�K�X
		String subject="����API2.1";	//²�T�D���A�D�����|�H��²�T���e�o�e�X�h�C�ΥH���O�����o�e���γ~�C�i�ǤJ�Ŧr��C
		String content="����API2.1 JAVA(eclipse)";	//²�T�o�e���e
		String mobile="0963139051";	//�����H��������X�C�榡��: +886912345678��09123456789�C�h�������H�ɡA�ХH�b�γr�I�j�}( , )�A�p0912345678,0922333444�C
		String sendTime="";	//²�T�w�w�o�e�ɶ��C-�ߧY�o�e�G�жǤJ�Ŧr��C-�w���o�e�G�жǤJ�w�p�o�e�ɶ��A�Y�ǰe�ɶ��p��t�α���ɶ��A�N�����ǰe�C�榡��YYYYMMDDhhmnss�F�Ҧp:�w��2009/01/31 15:30:00�o�e�A�h�ǤJ20090131153000�C�Y�ǻ��ɶ��w�O�{�b���ɶ��A�N�ߧY�o�e�C
		try{
			if(sms.getConnection(userID, password)){
				System.out.println(new StringBuffer("���o�s�u���\�ASessionKey�G").append(sms.getSessionKey()).toString());
				if(sms.getCredit()){
					System.out.println(new StringBuffer("���o�l�B���\�A�l�B�G").append(String.valueOf(sms.getCreditValue())).toString());
				}else{
					System.out.println(new StringBuffer("���o�l�B���ѡA���ѭ�]�G").append(sms.getProcessMsg()).toString());
				}
				if(sms.sendSMS(subject, content, mobile, sendTime)){
					System.out.println(new StringBuffer("�o�e²�T���\�A�l�B�G").append(String.valueOf(sms.getCreditValue())).append("�A²�T�帹�G").append(sms.getBatchID()).toString());
				}else{
					System.out.println(new StringBuffer("�o�e²�T���ѡA���ѭ�]�G").append(sms.getProcessMsg()).toString());
				}
			}else{
				System.out.println(new StringBuffer("���o�s�u���ѡA���ѭ�]�G").append(sms.getProcessMsg()).toString());
			}
		}catch(Exception ex){
			System.out.println(ex.getMessage());
		}
	}

}
