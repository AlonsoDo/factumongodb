var ClientCode = 0;
var ClientSortMode;

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

function searchClient(){
    
    var OrderSearch = $('#searchclient option:selected').val();
    //alert(OrderSearch)
    
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
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({contentsearchclient:$('#contentsearchclient').val(),orderresult:OrderSearch}),
        success: function(data){            
            alert('Ok');                     
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