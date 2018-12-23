VERSION 5.00
Begin VB.Form Form1 
   BorderStyle     =   1  'Fixed Single
   Caption         =   "API21 Sample(SOAP)"
   ClientHeight    =   5910
   ClientLeft      =   45
   ClientTop       =   435
   ClientWidth     =   7830
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   5910
   ScaleWidth      =   7830
   StartUpPosition =   3  'Windows Default
   Begin VB.Frame Frame2 
      Caption         =   "²�T�o�e"
      Height          =   4575
      Left            =   120
      TabIndex        =   11
      Top             =   1200
      Width           =   7575
      Begin VB.CommandButton btnSend 
         Caption         =   "�ǰe²�T"
         Height          =   375
         Left            =   5760
         TabIndex        =   6
         Top             =   3960
         Width           =   1575
      End
      Begin VB.TextBox txtPhones 
         Height          =   285
         Left            =   240
         TabIndex        =   5
         Top             =   3480
         Width           =   7095
      End
      Begin VB.TextBox txtContent 
         Height          =   1695
         Left            =   240
         MultiLine       =   -1  'True
         TabIndex        =   4
         Top             =   1440
         Width           =   7095
      End
      Begin VB.TextBox txtSubject 
         Height          =   285
         Left            =   240
         TabIndex        =   3
         Top             =   840
         Width           =   7095
      End
      Begin VB.Label Label8 
         Caption         =   "�I"
         Height          =   255
         Left            =   7080
         TabIndex        =   17
         Top             =   240
         Width           =   255
      End
      Begin VB.Label lblCredit 
         Caption         =   "------------"
         ForeColor       =   &H000000FF&
         Height          =   255
         Left            =   6000
         TabIndex        =   16
         Top             =   240
         Width           =   975
      End
      Begin VB.Label Label7 
         Caption         =   "�z�ثe�|��"
         Height          =   255
         Left            =   5040
         TabIndex        =   15
         Top             =   240
         Width           =   1095
      End
      Begin VB.Label Label5 
         Caption         =   "���T�H���(�h���Хγr�I�j�}):"
         Height          =   255
         Left            =   240
         TabIndex        =   14
         Top             =   3240
         Width           =   2775
      End
      Begin VB.Label Label6 
         Caption         =   "�o�e���e:"
         Height          =   255
         Left            =   240
         TabIndex        =   13
         Top             =   1200
         Width           =   1455
      End
      Begin VB.Label Label4 
         Caption         =   "�T���D��(���|�H��²�T���e�o�e�X�h�A�ȷ|�b�����X�{�A��K�z�޲z�C�@�����o�e):"
         Height          =   375
         Left            =   240
         TabIndex        =   12
         Top             =   600
         Width           =   7215
      End
   End
   Begin VB.Frame Frame1 
      Caption         =   "�n�JEVERY8D"
      Height          =   975
      Left            =   120
      TabIndex        =   7
      Top             =   120
      Width           =   7575
      Begin VB.TextBox txtUserID 
         Height          =   285
         Left            =   720
         TabIndex        =   0
         Top             =   240
         Width           =   1575
      End
      Begin VB.TextBox txtPassword 
         Height          =   285
         IMEMode         =   3  'DISABLE
         Left            =   3600
         PasswordChar    =   "*"
         TabIndex        =   1
         Top             =   240
         Width           =   1815
      End
      Begin VB.CommandButton btnLogin 
         Caption         =   "�n�J"
         Height          =   375
         Left            =   5760
         TabIndex        =   2
         Top             =   240
         Width           =   1575
      End
      Begin VB.Label Label1 
         Caption         =   "ID:"
         Height          =   375
         Left            =   360
         TabIndex        =   10
         Top             =   240
         Width           =   375
      End
      Begin VB.Label Label2 
         Caption         =   "Password:"
         Height          =   255
         Left            =   2760
         TabIndex        =   9
         Top             =   240
         Width           =   855
      End
      Begin VB.Label Label3 
         Caption         =   "(�п�J�z�bEVERY8D�W���U���b���K�X)"
         ForeColor       =   &H00FF0000&
         Height          =   255
         Left            =   360
         TabIndex        =   8
         Top             =   600
         Width           =   3255
      End
   End
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private sms As SMSSoap


Private Sub btnLogin_Click()

    If sms.getConnection(Me.txtUserID.Text, Me.txtPassword.Text) Then
        If sms.getCredit() Then
            lblCredit.Caption = CStr(sms.getCreditValue())
        End If
        MsgBox ("�n�J���\")
    Else
        MsgBox ("�n�J����")
    End If
    
End Sub

Private Sub btnSend_Click()
    Dim isConnected As Boolean
    isConnected = sms.isConnected()
    If Not isConnected Then
        If sms.getConnection(txtUserID.Text, txtPassword.Text) Then
            isConnected = True
        Else
            MsgBox ("�n�J����")
        End If
    End If
    If isConnected Then
        If sms.sendSMS(txtSubject.Text, txtContent.Text, txtPhones.Text, "") Then
            lblCredit.Caption = CStr(sms.getCreditValue())
            MsgBox ("�ǰe���\")
        Else
            MsgBox ("�ǰe����")
        End If
    End If
End Sub

Private Sub Form_Load()
    Set sms = New SMSSoap
End Sub
