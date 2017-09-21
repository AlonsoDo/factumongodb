//var ClientCode = 0;
//var ClientSortMode;
var ClientIndex;
var aClients = [];

function createClient(){
    
    $.ajax({
	statusCode:{500:function(){
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').toggleClass('modal-header modal-header-warning'); 
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
        url: 'http://localhost:3000/clients',                    
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({email:$('#emailclient').val(),comercialnameclient:$('#comercialnameclient').val(),
                                    fiscalnameclient:$('#fiscalnameclient').val(),addresclient:$('#addresclient').val(),
                                    postalcodeclient:$('#postalcodeclient').val(),cityclient:$('#cityclient').val(),
                                    personalcontactclient:$('#personalcontactclient').val(),nifclient:$('#nifclient').val(),
                                    mobilphoneclient:$('#mobilphoneclient').val(),workphoneclient:$('#workphoneclient').val()}),
        success: function(data){            
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                $('#colortitulo').toggleClass('modal-header modal-header-info'); 
            } 
            $('#mensage').text('New client create');
            $('#titulo').text('Information');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });                      
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').toggleClass('modal-header modal-header-warning'); 
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
                    $('#colortitulo').toggleClass('modal-header modal-header-warning'); 
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
                    $('#colortitulo').toggleClass('modal-header modal-header-warning'); 
                } 
                $('#mensage').text('No client found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });
            }else{                
                $('#codeclient').val(aClients[0].clientId);
                $('#comercialnameclient').val(aClients[0].comercialnameclient);
                $('#fiscalnameclient').val(aClients[0].fiscalnameclient);
                $('#addresclient').val(aClients[0].addresclient);
                $('#emailclient').val(aClients[0].email);
                $('#postalcodeclient').val(aClients[0].postalcodeclient);
                $('#cityclient').val(aClients[0].cityclient);
                $('#personalcontactclient').val(aClients[0].personalcontactclient);
                $('#nifclient').val(aClients[0].nifclient);
                $('#mobilphoneclient').val(aClients[0].phones.mobilphoneclient);
                $('#workphoneclient').val(aClients[0].phones.workphoneclient);
            }            
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').toggleClass('modal-header modal-header-warning'); 
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
                    $('#colortitulo').toggleClass('modal-header modal-header-warning'); 
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
                    $('#colortitulo').toggleClass('modal-header modal-header-warning'); 
                } 
                $('#mensage').text('No client found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });
            }else{                
                $('#codeclient').val(aClients[0].clientId);
                $('#comercialnameclient').val(aClients[0].comercialnameclient);
                $('#fiscalnameclient').val(aClients[0].fiscalnameclient);
                $('#addresclient').val(aClients[0].addresclient);
                $('#emailclient').val(aClients[0].email);
                $('#postalcodeclient').val(aClients[0].postalcodeclient);
                $('#cityclient').val(aClients[0].cityclient);
                $('#personalcontactclient').val(aClients[0].personalcontactclient);
                $('#nifclient').val(aClients[0].nifclient);
                $('#mobilphoneclient').val(aClients[0].phones.mobilphoneclient);
                $('#workphoneclient').val(aClients[0].phones.workphoneclient);
            }            
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').toggleClass('modal-header modal-header-warning'); 
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

