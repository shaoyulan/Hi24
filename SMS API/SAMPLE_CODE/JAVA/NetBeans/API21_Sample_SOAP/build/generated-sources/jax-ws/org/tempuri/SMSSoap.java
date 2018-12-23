
package org.tempuri;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebResult;
import javax.jws.WebService;
import javax.xml.bind.annotation.XmlSeeAlso;
import javax.xml.ws.RequestWrapper;
import javax.xml.ws.ResponseWrapper;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2-hudson-752-
 * Generated source version: 2.2
 * 
 */
@WebService(name = "SMSSoap", targetNamespace = "http://tempuri.org/")
@XmlSeeAlso({
    ObjectFactory.class
})
public interface SMSSoap {


    /**
     * 
     * @param userID
     * @param password
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "http://tempuri.org/getConnection")
    @WebResult(name = "getConnectionResult", targetNamespace = "http://tempuri.org/")
    @RequestWrapper(localName = "getConnection", targetNamespace = "http://tempuri.org/", className = "org.tempuri.GetConnection")
    @ResponseWrapper(localName = "getConnectionResponse", targetNamespace = "http://tempuri.org/", className = "org.tempuri.GetConnectionResponse")
    public String getConnection(
        @WebParam(name = "userID", targetNamespace = "http://tempuri.org/")
        String userID,
        @WebParam(name = "password", targetNamespace = "http://tempuri.org/")
        String password);

    /**
     * 
     * @param sessionKey
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "http://tempuri.org/closeConnection")
    @WebResult(name = "closeConnectionResult", targetNamespace = "http://tempuri.org/")
    @RequestWrapper(localName = "closeConnection", targetNamespace = "http://tempuri.org/", className = "org.tempuri.CloseConnection")
    @ResponseWrapper(localName = "closeConnectionResponse", targetNamespace = "http://tempuri.org/", className = "org.tempuri.CloseConnectionResponse")
    public String closeConnection(
        @WebParam(name = "sessionKey", targetNamespace = "http://tempuri.org/")
        String sessionKey);

    /**
     * 
     * @param content
     * @param subject
     * @param sendTime
     * @param sessionKey
     * @param mobile
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "http://tempuri.org/sendSMS")
    @WebResult(name = "sendSMSResult", targetNamespace = "http://tempuri.org/")
    @RequestWrapper(localName = "sendSMS", targetNamespace = "http://tempuri.org/", className = "org.tempuri.SendSMS")
    @ResponseWrapper(localName = "sendSMSResponse", targetNamespace = "http://tempuri.org/", className = "org.tempuri.SendSMSResponse")
    public String sendSMS(
        @WebParam(name = "sessionKey", targetNamespace = "http://tempuri.org/")
        String sessionKey,
        @WebParam(name = "subject", targetNamespace = "http://tempuri.org/")
        String subject,
        @WebParam(name = "content", targetNamespace = "http://tempuri.org/")
        String content,
        @WebParam(name = "mobile", targetNamespace = "http://tempuri.org/")
        String mobile,
        @WebParam(name = "sendTime", targetNamespace = "http://tempuri.org/")
        String sendTime);

    /**
     * 
     * @param contentXML
     * @param subject
     * @param sendTime
     * @param sessionKey
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "http://tempuri.org/sendParamSMS")
    @WebResult(name = "sendParamSMSResult", targetNamespace = "http://tempuri.org/")
    @RequestWrapper(localName = "sendParamSMS", targetNamespace = "http://tempuri.org/", className = "org.tempuri.SendParamSMS")
    @ResponseWrapper(localName = "sendParamSMSResponse", targetNamespace = "http://tempuri.org/", className = "org.tempuri.SendParamSMSResponse")
    public String sendParamSMS(
        @WebParam(name = "sessionKey", targetNamespace = "http://tempuri.org/")
        String sessionKey,
        @WebParam(name = "subject", targetNamespace = "http://tempuri.org/")
        String subject,
        @WebParam(name = "contentXML", targetNamespace = "http://tempuri.org/")
        String contentXML,
        @WebParam(name = "sendTime", targetNamespace = "http://tempuri.org/")
        String sendTime);

    /**
     * 
     * @param batchID
     * @param sessionKey
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "http://tempuri.org/eraseBooking")
    @WebResult(name = "eraseBookingResult", targetNamespace = "http://tempuri.org/")
    @RequestWrapper(localName = "eraseBooking", targetNamespace = "http://tempuri.org/", className = "org.tempuri.EraseBooking")
    @ResponseWrapper(localName = "eraseBookingResponse", targetNamespace = "http://tempuri.org/", className = "org.tempuri.EraseBookingResponse")
    public String eraseBooking(
        @WebParam(name = "sessionKey", targetNamespace = "http://tempuri.org/")
        String sessionKey,
        @WebParam(name = "batchID", targetNamespace = "http://tempuri.org/")
        String batchID);

    /**
     * 
     * @param pageNo
     * @param batchID
     * @param sessionKey
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "http://tempuri.org/getDeliveryStatus")
    @WebResult(name = "getDeliveryStatusResult", targetNamespace = "http://tempuri.org/")
    @RequestWrapper(localName = "getDeliveryStatus", targetNamespace = "http://tempuri.org/", className = "org.tempuri.GetDeliveryStatus")
    @ResponseWrapper(localName = "getDeliveryStatusResponse", targetNamespace = "http://tempuri.org/", className = "org.tempuri.GetDeliveryStatusResponse")
    public String getDeliveryStatus(
        @WebParam(name = "sessionKey", targetNamespace = "http://tempuri.org/")
        String sessionKey,
        @WebParam(name = "batchID", targetNamespace = "http://tempuri.org/")
        String batchID,
        @WebParam(name = "pageNo", targetNamespace = "http://tempuri.org/")
        String pageNo);

    /**
     * 
     * @param sessionKey
     * @return
     *     returns java.lang.String
     */
    @WebMethod(action = "http://tempuri.org/getCredit")
    @WebResult(name = "getCreditResult", targetNamespace = "http://tempuri.org/")
    @RequestWrapper(localName = "getCredit", targetNamespace = "http://tempuri.org/", className = "org.tempuri.GetCredit")
    @ResponseWrapper(localName = "getCreditResponse", targetNamespace = "http://tempuri.org/", className = "org.tempuri.GetCreditResponse")
    public String getCredit(
        @WebParam(name = "sessionKey", targetNamespace = "http://tempuri.org/")
        String sessionKey);

}
