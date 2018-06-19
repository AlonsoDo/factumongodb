var aClientsBrowse = [];
var nRowClientGrid = 1;
var aBillsBrowse = [];
var nRowBillBrowse = 1;
var aDetailBrowse = [];
var nRowDetail = 1;
var nClientLastSelect = 1;
var nBillLastSelect = 1;

function InitClientGrid(){
    $('#jqClient').jqGrid({
        datatype: 'local',
        data: aClientsBrowse,
        cellsubmit: 'clientArray',
        cellEdit: false,
        colModel: [
            { label: 'Code', name: 'clientId', width: 75 , editable: false},
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
        },
        onSelectRow: function(ids) {            
            console.log('id:' + ids);
            FillBillsBrowse(ids);
        }
    });
}

function InitBillGridBrowse(){
    $('#jqBills').jqGrid({
        datatype: 'local',
        data: aBillsBrowse,
        cellsubmit: 'clientArray',
        cellEdit: false,
        colModel: [
            { label: 'Code', name: 'billId', width: 75 },
            { label: 'Date', name: 'billDate', width: 275},
            { label: 'Total', name: 'billTotal', width: 100 , align: 'right'},
            { label: '', name: '', width: 20}
        ],
        viewrecords: true,
        width: 930,
        height: 150,        
        gridComplete: function() {
            $('tr.jqgrow:even').addClass('myAltRowClass');
            $('tr.jqgrow:odd').addClass('myAltRowClass2');            
        },
        onSelectRow: function(ids) {
            console.log('id:' + ids);
            FillBillsDetailBrowse(ids);
        }
    });
}

function InitDetailGridBrowse(){
    $('#jqDetail').jqGrid({
        datatype: 'local',
        data: aBillsBrowse,
        cellsubmit: 'clientArray',
        cellEdit: false,
        colModel: [
            { label: 'Unity', name: 'unity', width: 75 },
            { label: 'Name', name: 'name', width: 300},
            { label: 'Price', name: 'price', width: 100 , align: 'right'},
            { label: 'Discount', name: 'discount', width: 90 , align: 'right'},
            { label: 'Taxes', name: 'taxes', width: 90 , align: 'right'},
            { label: 'Amount', name: 'amount', width: 110 , align: 'right'},
            { label: '', name: '', width: 30}
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

function FillBillsBrowse(ids){
    
    var nClientCode = $('#jqClient').jqGrid('getCell',ids,'clientId');    
    
    $('#jqClient').jqGrid('setRowData', nClientLastSelect, false, {color:'black'});
    
    nClientLastSelect = ids;
    
    $('#jqClient').jqGrid('setRowData', ids, false, {color:'red'});
    
    console.log(nClientCode)
    
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
        url: 'http://localhost:3000/fillgridbillsbrowse',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({clientId:nClientCode}),
        success: function(data){             
            aBillsBrowse = eval(data);
            if (aBillsBrowse.length==0) {                
                jQuery('#jqBills').jqGrid('clearGridData');
                jQuery('#jqDetail').jqGrid('clearGridData');
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                } 
                $('#mensage').text('No bills found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });                           
            }else{                
                // Fill Grid
                var aDetailBill = [];
                jQuery('#jqBills').jqGrid('clearGridData');
                for (var i=0; i<aBillsBrowse.length; i++){
                    aDetailBill = aBillsBrowse[i].detail;
                    var nTotal = 0;                    
                    for (var j=0; j<aDetailBill.length; j++){
                        var Unity = parseFloat(aDetailBill[j].unity);
                        var Price = parseFloat(aDetailBill[j].price);
                        var Discount = parseFloat(aDetailBill[j].discount);
                        var Taxes = parseFloat(aDetailBill[j].taxes);
                        var Amount;                        
                        Amount = (Unity * (Price - ((Price * Discount)/100))) + (((Unity * (Price - ((Price * Discount)/100))) * Taxes)/100);
                        nTotal = nTotal + Amount; 
                    }                    
                    jQuery('#jqBills').jqGrid('addRowData', nRowBillBrowse , { 'billId': aBillsBrowse[i].billId , 'billDate': aBillsBrowse[i].date , 'billTotal': nTotal.toFixed(2)});
                    nRowBillBrowse++; 
                }
            }
            console.log('ok')
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

function FillBillsDetailBrowse(ids){
    
    var nBillCode = $('#jqBills').jqGrid('getCell',ids,'billId');
    
    $('#jqBills').jqGrid('setRowData', nBillLastSelect, false, {color:'black'});
    
    nBillLastSelect = ids;
    
    $('#jqBills').jqGrid('setRowData', ids, false, {color:'red'});
    
    console.log(nBillCode)
    
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
        url: 'http://localhost:3000/fillgriddetailbrowse',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({billId:nBillCode}),
        success: function(data){             
            aDetailBrowse = eval(data);
            console.log(aDetailBrowse[0].detail)
            if (aDetailBrowse[0].detail.length==0) {                
                jQuery('#jqDetail').jqGrid('clearGridData');
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                } 
                $('#mensage').text('No detail found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });                           
            }else{                
                // Fill Grid
                var aDetailBill = [];
                jQuery('#jqDetail').jqGrid('clearGridData');
                aDetailBill = aDetailBrowse[0].detail;
                for (var j=0; j<aDetailBill.length; j++){
                    var Name = aDetailBill[j].name;
                    var Unity = parseFloat(aDetailBill[j].unity);
                    var Price = parseFloat(aDetailBill[j].price);
                    var Discount = parseFloat(aDetailBill[j].discount);
                    var Taxes = parseFloat(aDetailBill[j].taxes);
                    var Amount;                        
                    Amount = (Unity * (Price - ((Price * Discount)/100))) + (((Unity * (Price - ((Price * Discount)/100))) * Taxes)/100);
                    jQuery('#jqDetail').jqGrid('addRowData', nRowDetail , { 'unity': Unity , 'name': Name , 'price': Price.toFixed(2) , 'discount': Discount.toFixed(2) , 'taxes': Taxes.toFixed(2) , 'amount': Amount.toFixed(2) });
                    nRowDetail++; 
                }                
            }
            console.log('ok')
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