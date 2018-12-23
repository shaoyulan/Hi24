import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.tempuri.SMSSoapProxy;


public class SMSSoapService {
	private SMSSoapProxy smsService;
	private String sessionKey="";
	private String batchID="";
	private String processMsg="";
	private double credit=0;
	
	public SMSSoapService(){
		this.smsService=new SMSSoapProxy();
	}

	/// <summary>
	/// ���ѱҰʳs���A�ȡA�ǰe²�T�e���������o���oSessionKey�A
	/// �ǥѦ�SessionKey�i�����²�T�ǰe���A�ȡASessionKey���Ĵ������A�j��Y���ġC
	/// ��ĳ�󧹦��ǰe�@�~��A����closeConnection�H�T�O�w���C
	/// </summary>
	/// <param name="userID">�n�J�b��</param>
	/// <param name="password">�K�X</param>
	/// <returns>true:���o�s�u���\�Ffalse:���o�s�u����</returns>
	public boolean getConnection(String userID, String password) {
		boolean success = false;
		try {
			String resultXml = this.smsService.getConnection(userID, password);
			Document xmlDoc= DocumentHelper.parseText(resultXml);
			String returnCode = xmlDoc.selectSingleNode("/SMS/GET_CONNECTION/CODE").getText();
			if (returnCode.equals("0")) {
				this.sessionKey = xmlDoc.selectSingleNode("/SMS/GET_CONNECTION/SESSION_KEY").getText();
				this.processMsg = xmlDoc.selectSingleNode("/SMS/GET_CONNECTION/DESCRIPTION").getText();
				success = true;
			} else {
				this.processMsg = xmlDoc.selectSingleNode("/SMS/GET_CONNECTION/DESCRIPTION").getText();
			}
		} catch (Exception ex) {
			this.processMsg = ex.getMessage();
		}
		return success;
	}
	
	/// <summary>
	/// SessionKey���Ĵ������A�j��Y���ġC��ĳ�󧹦��ǰe�@�~��A����closeConnection�H�T�O�w��
	/// </summary>
	/// <returns>true:�������\�Ffalse:��������</returns>
	public boolean closeConnection() {
		boolean success = false;
		try {
			String resultString = this.smsService.closeConnection(this.sessionKey);
			if (!resultString.startsWith("-")) {
				this.sessionKey = "";
				success = true;
			}
		} catch (Exception ex) {
			this.processMsg = ex.getMessage();
		}
		return success;
	}
	
	/// <summary>
	/// �ǰe²�T
	/// </summary>
	/// <param name="subject">²�T�D���A�D�����|�H��²�T���e�o�e�X�h�C�ΥH���O�����o�e���γ~�C�i�ǤJ�Ŧr��C</param>
	/// <param name="content">²�T�o�e���e</param>
	/// <param name="mobile">�����H��������X�C�榡��: +886912345678��09123456789�C�h�������H�ɡA�ХH�b�γr�I�j�}( , )�A�p0912345678,0922333444�C</param>
	/// <param name="sendTime">²�T�w�w�o�e�ɶ��C-�ߧY�o�e�G�жǤJ�Ŧr��C-�w���o�e�G�жǤJ�w�p�o�e�ɶ��A�Y�ǰe�ɶ��p��t�α���ɶ��A�N�����ǰe�C�榡��YYYYMMDDhhmnss�F�Ҧp:�w��2009/01/31 15:30:00�o�e�A�h�ǤJ20090131153000�C�Y�ǻ��ɶ��w�O�{�b���ɶ��A�N�ߧY�o�e�C</param>
	/// <returns>true:�ǰe���\�Ffalse:�ǰe����</returns>
	public boolean sendSMS(String subject, String content, String mobile, String sendTime) {
		boolean success = false;
		try {
			String resultString = this.smsService.sendSMS(this.sessionKey, subject, content, mobile, sendTime);
			if (!resultString.startsWith("-")) {
				/* 
				 * �ǰe���\ �^�Ǧr�ꤺ�e�榡���GCREDIT,SENDED,COST,UNSEND,BATCH_ID�A�U�Ȥ����H�r�����j�C
				 * CREDIT�G�o�e��Ѿl�I�ơC�t�ȥN��o�e���ѡA�t�εL�k�B�z�өR�O
				 * SENDED�G�o�e�q�ơC
				 * COST�G�����o�e�����I��
				 * UNSEND�G�L�B�׮ɵo�e���q�ơA��ӭȤj��0�ӳѾl�I�Ƶ���0�ɪ�ܦ�������²�T�]�L�B�צӵL�k�Q�o�e�C
				 * BATCH_ID�G�妸�ѧO�N�X�C���@�ߤ@�ѧO�X�A�i�ǥѥ��ѧO�X�d�ߵo�e���A�C�榡�d�ҡG220478cc-8506-49b2-93b7-2505f651c12e
				 */
				String[] split = resultString.split(",");
				this.credit = Double.parseDouble(split[0]);
				this.batchID = split[4];
				success = true;
			} else {
				//�ǰe����
				this.processMsg = resultString;
			}

		} catch (Exception ex) {
			this.processMsg = ex.getMessage();
		}
		return success;
	}
	
	/// <summary>
	/// ���o�b���l�B
	/// </summary>
	/// <returns>true:���o���\�Ffalse:���o����</returns>
	public boolean getCredit() {
		boolean success = false;
		try {
			String resultString = this.smsService.getCredit(this.sessionKey);
			if (!resultString.startsWith("-")) {
				this.credit = Double.parseDouble(resultString);
				success = true;
			} else {
				this.processMsg = resultString;
			}
		} catch (Exception ex) {
			this.processMsg = ex.getMessage();
		}
		return success;
	}
	
	public String getSessionKey() {
		return sessionKey;
	}

	public String getBatchID() {
		return batchID;
	}

	public String getProcessMsg() {
		return processMsg;
	}

	public double getCreditValue() {
		return credit;
	}

}
