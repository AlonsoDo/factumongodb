function login(){
    
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
        url: 'http://localhost:3000/authenticate',                    
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({email:$('#email').val(),pass:$('#pass').val()}),
        success: function(data){
            if (data.success){
                //Get segurity token
                AuthenticateToken = data.token;
                $('#view1').hide();
                $('#view2').show();
                //Load company data
                $('#companyTitle').text(data.comercialcompanyname);
                $('#comercialname').val(data.comercialcompanyname);
                $('#fiscalname').val(data.fiscalcompanyname);
                $('#addres').val(data.addres);
                $('#postalcode').val(data.postalcode);
                $('#city').val(data.city);
                $('#nif').val(data.nif);
                $('#mobilphone').val(data.mobil);
                $('#workphone').val(data.work);
                $('#viewcompany').show();
            }else{                            
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');
                }
                $('#mensage').text(data.message);
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });                            
            }                        
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                //$('#colortitulo').toggleClass('modal-header modal-header-warning');
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

function createCompany(){
    
    $.ajax({
	statusCode:{500:function(){
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');
                }
                $('#newCompanyForm').modal('hide');
                $('#mensage').text('Error with the server');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                }); 
            }
        },                    
        url: 'http://localhost:3000/companies',                    
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({email:$('#email1').val(),pass:$('#pass1').val(),admin:'not',comercialcompanyname:'Your comercial company name',
                                    fiscalcompanyname:'fiscal company name',addres:'addres company',postalcode:'00000',
                                    city:'Your city',nif:'00-A',mobil:'000000000',work:'000000000'}),
        success: function(data){
            $('#newCompanyForm').modal('hide');
            $('#view1').hide();
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                $('#colortitulo').removeClass('modal-header modal-header-warning').addClass('modal-header modal-header-info');
            }
            $('#mensage').text('New company create');
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

function saveCompanyData(){
    
    $.ajax({
	statusCode:{500:function(){
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
                }
                $('#newCompanyForm').modal('hide');
                $('#mensage').text('Error with the server');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                }); 
            }
        },
        headers: { 'x-access-token': AuthenticateToken },
        url: 'http://localhost:3000/companies',                    
        type: 'put',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({email:$('#email').val(),pass:$('#pass').val(),admin:'not',comercialcompanyname:$('#comercialname').val(),
                                     fiscalcompanyname:$('#fiscalname').val(),addres:$('#addres').val(),postalcode:$('#postalcode').val(),
                                     city:$('#city').val(),nif:$('#nif').val(),mobil:$('#mobilphone').val(),work:$('#workphone').val()}),
        success: function(data){                        
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-info'); 
            } 
            $('#mensage').text('Data company updated');
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