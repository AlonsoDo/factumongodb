var ClientIndex;
var aClients = [];
var UpdateMode = 'Update';
var BufferClientCode;
var BufferClientEmail;
var BufferClientComercialName;
var BufferClientFiscalName;
var BufferClientAddres;
var BufferClientPostalCode;
var BufferClientCity;
var BufferClientNif;
var BufferClientMobilPhone;
var BufferClientWorkPhone;
var BufferClientPersonalContact;
var CodeClientSended = 0;

function updateClient(){
        
    $.ajax({
	statusCode:{500:function(){
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                }                
                $('#mensage').text('Error with the server');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                }); 
            }
        },
        headers: { 'x-access-token': AuthenticateToken },
        url: 'http://localhost:3000/updateclient',                    
        type: 'put',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({clientId:$('#codeclient').val(),email:$('#emailclient').val(),comercialnameclient:$('#comercialnameclient').val(),
                                    fiscalnameclient:$('#fiscalnameclient').val(),addresclient:$('#addresclient').val(),
                                    postalcodeclient:$('#postalcodeclient').val(),cityclient:$('#cityclient').val(),
                                    personalcontactclient:$('#personalcontactclient').val(),nifclient:$('#nifclient').val(),
                                    mobilphoneclient:$('#mobilphoneclient').val(),workphoneclient:$('#workphoneclient').val()}),
        success: function(data){
            aClients[ClientIndex].email = $('#emailclient').val();
            aClients[ClientIndex].comercialnameclient = $('#comercialnameclient').val();
            aClients[ClientIndex].fiscalnameclient = $('#fiscalnameclient').val();
            aClients[ClientIndex].addresclient = $('#addresclient').val();
            aClients[ClientIndex].postalcodeclient = $('#postalcodeclient').val();
            aClients[ClientIndex].cityclient = $('#cityclient').val();
            aClients[ClientIndex].nifclient = $('#nifclient').val();
            aClients[ClientIndex].phones.mobilphoneclient = $('#mobilphoneclient').val();
            aClients[ClientIndex].phones.workphoneclient = $('#workphoneclient').val();
            aClients[ClientIndex].personalcontactclient = $('#personalcontactclient').val();
            BufferingClientData();
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                $('#colortitulo').removeClass('modal-header modal-header-warning').addClass('modal-header modal-header-info'); 
            } 
            $('#mensage').text('Client update');
            $('#titulo').text('Information');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });            
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
            } 
            $('#mensage').text('Error with the server');
            $('#titulo').text('Atenction!');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });                        
        }
    });
}

function createClient(){
    
    $.ajax({
	statusCode:{500:function(){
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                }                
                $('#mensage').text('Error with the server');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                }); 
            }
        },
        headers: { 'x-access-token': AuthenticateToken },
        url: 'http://localhost:3000/newclient',                    
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({email:$('#emailclient').val(),comercialnameclient:$('#comercialnameclient').val(),
                                    fiscalnameclient:$('#fiscalnameclient').val(),addresclient:$('#addresclient').val(),
                                    postalcodeclient:$('#postalcodeclient').val(),cityclient:$('#cityclient').val(),
                                    personalcontactclient:$('#personalcontactclient').val(),nifclient:$('#nifclient').val(),
                                    mobilphoneclient:$('#mobilphoneclient').val(),workphoneclient:$('#workphoneclient').val()}),
        success: function(data){
            //Add new client at the end of array            
            aClients.push({clientId:data.ClientCode,companyId:data.CompanyCode,email:$('#emailclient').val(),
                                comercialnameclient:$('#comercialnameclient').val(),fiscalnameclient:$('#fiscalnameclient').val(),
                                addresclient:$('#addresclient').val(),postalcodeclient:$('#postalcodeclient').val(),
                                cityclient:$('#cityclient').val(),nifclient:$('#nifclient').val(),
                                phones:{mobilphoneclient:$('#mobilphoneclient').val(),workphoneclient:$('#workphoneclient').val()},
                                personalcontactclient:$('#personalcontactclient').val()});            
            $('#codeclient').val(data.ClientCode);
            ClientIndex = aClients.length - 1;
            if (aClients.length>1) {
                $('#PrevClient').prop('disabled',false);
                $('#IniClient').prop('disabled',false);
            }
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                $('#colortitulo').removeClass('modal-header modal-header-warning').addClass('modal-header modal-header-info'); 
            } 
            $('#mensage').text('New client create');
            $('#titulo').text('Information');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });
            ActiveClient();
            BufferingClientData();
            $('#DeleteClient').prop('disabled',false);
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
            } 
            $('#mensage').text('Error with the server');
            $('#titulo').text('Atenction!');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });                        
        }
    });
    
}

function searchClients(){
    
    var OrderSearch = $('#searchclient option:selected').val();
        
    $.ajax({
	statusCode:{500:function(){
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
                }                
                $('#mensage').text('Error with the server');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                }); 
            }
        },
        headers: { 'x-access-token': AuthenticateToken },
        url: 'http://localhost:3000/searchclients',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({contentsearchclient:$('#contentsearchclient').val(),orderresult:OrderSearch}),
        success: function(data){             
            $('#NextClient').prop('disabled',true);
            $('#EndClient').prop('disabled',true);
            $('#PrevClient').prop('disabled',true);
            $('#IniClient').prop('disabled',true);
            aClients = eval(data);
            if (aClients.length==0) {
                $('#codeclient').val('0');
                $('#comercialnameclient').val('');
                $('#fiscalnameclient').val('');
                $('#addresclient').val('');
                $('#emailclient').val('');
                $('#postalcodeclient').val('');
                $('#cityclient').val('');
                $('#personalcontactclient').val('');
                $('#nifclient').val('');
                $('#mobilphoneclient').val('');
                $('#workphoneclient').val('');
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                } 
                $('#mensage').text('No client found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });
            }else if (aClients.length==1) {
                ClientIndex = 0;
                LoadClientData();
                ActiveClient();
                BufferingClientData();
                $('#DeleteClient').prop('disabled',false);
            }else{                
                ClientIndex = 0;
                LoadClientData();
                ActiveClient();
                BufferingClientData();
                $('#NextClient').prop('disabled',false);
                $('#EndClient').prop('disabled',false);
                $('#DeleteClient').prop('disabled',false);
            }            
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
            } 
            $('#mensage').text('Error with the server');
            $('#titulo').text('Atenction!');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });                        
        }
    });
    
}

function searchClientsFilter(){
    
    var OrderSearch = $('#searchclient option:selected').val();
        
    $.ajax({
	statusCode:{500:function(){
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
                }                
                $('#mensage').text('Error with the server');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                }); 
            }
        },
        headers: { 'x-access-token': AuthenticateToken },
        url: 'http://localhost:3000/searchclientsfilter',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({contentsearchclient:$('#contentsearchclient').val(),orderresult:OrderSearch}),
        success: function(data){
            $('#NextClient').prop('disabled',true);
            $('#EndClient').prop('disabled',true);
            $('#PrevClient').prop('disabled',true);
            $('#IniClient').prop('disabled',true);
            aClients = eval(data);
            if (aClients.length==0) {
                $('#codeclient').val('0');
                $('#comercialnameclient').val('');
                $('#fiscalnameclient').val('');
                $('#addresclient').val('');
                $('#emailclient').val('');
                $('#postalcodeclient').val('');
                $('#cityclient').val('');
                $('#personalcontactclient').val('');
                $('#nifclient').val('');
                $('#mobilphoneclient').val('');
                $('#workphoneclient').val('');
                $('#NextClient').prop('disabled',true);
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                } 
                $('#mensage').text('No client found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });
            }else if (aClients.length==1) {
                ClientIndex = 0;
                LoadClientData();
                ActiveClient();
                BufferingClientData();
                $('#DeleteClient').prop('disabled',false);
            }else{                
                ClientIndex = 0;
                LoadClientData();
                ActiveClient();
                BufferingClientData();
                $('#NextClient').prop('disabled',false);
                $('#EndClient').prop('disabled',false);
                $('#DeleteClient').prop('disabled',false);
            }            
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
            } 
            $('#mensage').text('Error with the server');
            $('#titulo').text('Atenction!');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });                        
        }
    });
}

function deleteClient(){    
        
    $.ajax({
	statusCode:{500:function(){
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
                }                
                $('#mensage').text('Error with the server');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                }); 
            }
        },
        headers: { 'x-access-token': AuthenticateToken },
        url: 'http://localhost:3000/deleteclient',                    
        type: 'delete',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({clientId:$('#codeclient').val()}),
        success: function(data){
            //Update array
            aClients.splice(ClientIndex,1);
            if (aClients.length==0){
                DeactiveClient();
                $('#codeclient').val('0');
                $('#comercialnameclient').val('');
                $('#fiscalnameclient').val('');
                $('#addresclient').val('');
                $('#emailclient').val('');
                $('#postalcodeclient').val('');
                $('#cityclient').val('');
                $('#personalcontactclient').val('');
                $('#nifclient').val('');
                $('#mobilphoneclient').val('');
                $('#workphoneclient').val('');                    
                $('#SaveClient').prop('disabled',true);
                $('#ResetClient').prop('disabled',true);
                $('#NewClient').prop('disabled',false);
                $('#DeleteClient').prop('disabled',true);
            }else{
                ClientIndex--;
                if (ClientIndex<0) {
                    ClientIndex = 0;
                    $('#PrevClient').prop('disabled',true);
                    $('#IniClient').prop('disabled',true);
                }
                LoadClientData();
                BufferingClientData();
                if (aClients.length==1){
                    $('#PrevClient').prop('disabled',true);
                    $('#IniClient').prop('disabled',true);
                    $('#NextClient').prop('disabled',true);
                    $('#EndClient').prop('disabled',true); 
                }
            }
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                $('#colortitulo').removeClass('modal-header modal-header-warning').addClass('modal-header modal-header-info');  
            } 
            $('#mensage').text('Client delete');
            $('#titulo').text('Information');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });            
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
            } 
            $('#mensage').text('Error with the server');
            $('#titulo').text('Atenction!');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });                        
        }
    });
    
}    

function nextClient(){
    
    if (aClients.length>1) {
        $('#PrevClient').prop('disabled',false);
        $('#IniClient').prop('disabled',false);
    }
    
    ClientIndex++;
    if (ClientIndex==aClients.length-1){        
        $('#NextClient').prop('disabled',true);
        $('#EndClient').prop('disabled',true);
    }
    
    LoadClientData();
    
    BufferingClientData();
    
    $('#SaveClient').prop('disabled',true);
    $('#ResetClient').prop('disabled',true);
    $('#NewClient').prop('disabled',false);
    $('#DeleteClient').prop('disabled',false);
    
}

function prevClient(){
    
    if (aClients.length>1) {
        $('#NextClient').prop('disabled',false);
        $('#EndClient').prop('disabled',false);
    }
    
    ClientIndex--;
    if (ClientIndex==0){        
        $('#PrevClient').prop('disabled',true);
        $('#IniClient').prop('disabled',true);
    }
    
    LoadClientData();
    
    BufferingClientData();
    
    $('#SaveClient').prop('disabled',true);
    $('#ResetClient').prop('disabled',true);
    $('#NewClient').prop('disabled',false);
    $('#DeleteClient').prop('disabled',false);
        
}

function iniClient(){
    
    if (aClients.length>1) {
        $('#NextClient').prop('disabled',false);
        $('#EndClient').prop('disabled',false);
    }
    
    ClientIndex=0;
    $('#PrevClient').prop('disabled',true);
    $('#IniClient').prop('disabled',true);
    
    LoadClientData();
    
    BufferingClientData();
    
    $('#SaveClient').prop('disabled',true);
    $('#ResetClient').prop('disabled',true);
    $('#NewClient').prop('disabled',false);
    $('#DeleteClient').prop('disabled',false);
    
}

function endClient(){
    
    if (aClients.length>1) {
        $('#PrevClient').prop('disabled',false);
        $('#IniClient').prop('disabled',false);
    }
    
    ClientIndex = aClients.length - 1;
    $('#NextClient').prop('disabled',true);
    $('#EndClient').prop('disabled',true);    
        
    LoadClientData();
    
    BufferingClientData();
    
    $('#SaveClient').prop('disabled',true);
    $('#ResetClient').prop('disabled',true);
    $('#NewClient').prop('disabled',false);
    $('#DeleteClient').prop('disabled',false);
    
}

function LoadClientData(){
    
    $('#codeclient').val(aClients[ClientIndex].clientId);
    $('#comercialnameclient').val(aClients[ClientIndex].comercialnameclient);
    $('#fiscalnameclient').val(aClients[ClientIndex].fiscalnameclient);
    $('#addresclient').val(aClients[ClientIndex].addresclient);
    $('#emailclient').val(aClients[ClientIndex].email);
    $('#postalcodeclient').val(aClients[ClientIndex].postalcodeclient);
    $('#cityclient').val(aClients[ClientIndex].cityclient);
    $('#personalcontactclient').val(aClients[ClientIndex].personalcontactclient);
    $('#nifclient').val(aClients[ClientIndex].nifclient);
    $('#mobilphoneclient').val(aClients[ClientIndex].phones.mobilphoneclient);
    $('#workphoneclient').val(aClients[ClientIndex].phones.workphoneclient);
    
}

function BufferingClientData(){
    
    BufferClientCode = $('#codeclient').val();
    BufferClientComercialName = $('#comercialnameclient').val();
    BufferClientFiscalName = $('#fiscalnameclient').val();
    BufferClientAddres = $('#addresclient').val();
    BufferClientEmail = $('#emailclient').val();
    BufferClientPostalCode = $('#postalcodeclient').val();
    BufferClientCity = $('#cityclient').val();
    BufferClientPersonalContact = $('#personalcontactclient').val();
    BufferClientNif = $('#nifclient').val();
    BufferClientMobilPhone = $('#mobilphoneclient').val();
    BufferClientWorkPhone = $('#workphoneclient').val();
    
}

function DeactiveClient(){
    
    $('#comercialnameclient').prop('disabled',true);
    $('#fiscalnameclient').prop('disabled',true);
    $('#addresclient').prop('disabled',true);
    $('#emailclient').prop('disabled',true);
    $('#postalcodeclient').prop('disabled',true);
    $('#cityclient').prop('disabled',true);
    $('#personalcontactclient').prop('disabled',true);
    $('#nifclient').prop('disabled',true);
    $('#mobilphoneclient').prop('disabled',true);
    $('#workphoneclient').prop('disabled',true);
    
}

function ActiveClient(){
    
    $('#comercialnameclient').prop('disabled',false);
    $('#fiscalnameclient').prop('disabled',false);
    $('#addresclient').prop('disabled',false);
    $('#emailclient').prop('disabled',false);
    $('#postalcodeclient').prop('disabled',false);
    $('#cityclient').prop('disabled',false);
    $('#personalcontactclient').prop('disabled',false);
    $('#nifclient').prop('disabled',false);
    $('#mobilphoneclient').prop('disabled',false);
    $('#workphoneclient').prop('disabled',false);
    
}

function ResetClient(){
    
    if (aClients.length>0) {
        LoadClientData();
    }else{
        DeactiveClient();
        $('#codeclient').val('0');
        $('#comercialnameclient').val('');
        $('#fiscalnameclient').val('');
        $('#addresclient').val('');
        $('#emailclient').val('');
        $('#postalcodeclient').val('');
        $('#cityclient').val('');
        $('#personalcontactclient').val('');
        $('#nifclient').val('');
        $('#mobilphoneclient').val('');
        $('#workphoneclient').val('');
    }                
    $('#SaveClient').prop('disabled',true);
    $('#ResetClient').prop('disabled',true);
    $('#NewClient').prop('disabled',false);
    $('#DeleteClient').prop('disabled',false);
    
}

function SendClientData(){    
    
    $('#comercialnamebill').val($('#comercialnameclient').val());
    CodeClientSended = $('#codeclient').val();
    
}