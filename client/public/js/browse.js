var aClientsBrowse = [];
var nRowClientGrid = 1;

function InitClientGrid(){
    $('#jqClient').jqGrid({
        datatype: 'local',
        data: aClientsBrowse,
        cellsubmit: 'clientArray',
        cellEdit: true,
        colModel: [
            { label: 'Code', name: 'clientId', width: 75 },
            { label: 'Comercial name', name: 'comercialnameclient', width: 275},
            { label: 'Contact', name: 'personalcontactclient', width: 100 },
            { label: 'Mobil phone', name: 'mobilphone', width: 100 }
        ],
        viewrecords: true,
        width: 930,
        height: 150,        
        gridComplete: function() {
            $('tr.jqgrow:even').addClass('myAltRowClass');
            $('tr.jqgrow:odd').addClass('myAltRowClass2');            
        }
    });
}

function searchClientsBrowse(){
    
    var OrderSearch = $('#searchclientbrowse option:selected').val();
        
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
	data: JSON.stringify({contentsearchclient:$('#contentsearchclientbrowse').val(),orderresult:OrderSearch}),
        success: function(data){             
            aClientsBrowse = eval(data);
            if (aClientsBrowse.length==0) {                
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                } 
                $('#mensage').text('No client found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });                           
            }else{                
                // Fill Grid
                jQuery('#jqClient').jqGrid('clearGridData');
                for (var i=0; i<aClientsBrowse.length; i++){
                    jQuery('#jqClient').jqGrid('addRowData', nRowClientGrid , { 'clientId': aClientsBrowse[i].clientId , 'comercialnameclient': aClientsBrowse[i].comercialnameclient , 'personalcontactclient': aClientsBrowse[i].personalcontactclient , 'mobilphone': aClientsBrowse[i].phones.mobilphoneclient });
                    nRowClientGrid++; 
                }
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

function searchClientsFilterBrowse(){
    
    var OrderSearch = $('#searchclientbrowse option:selected').val();
        
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
	data: JSON.stringify({contentsearchclient:$('#contentsearchclientbrowse').val(),orderresult:OrderSearch}),
        success: function(data){             
            aClientsBrowse = eval(data);
            if (aClientsBrowse.length==0) {                
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                } 
                $('#mensage').text('No client found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });                           
            }else{                
                // Fill Grid
                jQuery('#jqClient').jqGrid('clearGridData');
                for (var i=0; i<aClientsBrowse.length; i++){
                    jQuery('#jqClient').jqGrid('addRowData', nRowClientGrid , { 'clientId': aClientsBrowse[i].clientId , 'comercialnameclient': aClientsBrowse[i].comercialnameclient , 'personalcontactclient': aClientsBrowse[i].personalcontactclient , 'mobilphone': aClientsBrowse[i].phones.mobilphoneclient });
                    nRowClientGrid++; 
                }
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