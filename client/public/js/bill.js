function InitBillGrid(){
    
    // specify the data
    var aBill = [
        //{ 'code': 1, 'unity': 25, 'name': 'Coca-Cola 2L.', 'price': 2.50, 'discount': 10.00, 'taxes': 7.00 , 'amount': 100},
        //{ 'code': 1, 'unity': 25, 'name': 'Coca-Cola 2L.', 'price': 2.50, 'discount': 10.00, 'taxes': 7.00 , 'amount': 100} 
    ];    
        
    $('#jqGrid').jqGrid({
        datatype: 'local',
        data: aBill,
        cellsubmit: 'clientArray',
        cellEdit: true,
        colModel: [
            { label: 'Code', name: 'code', width: 75, editable: true , editoptions:{
                                size: 15, maxlengh: 10,
                                dataInit: function(element) {
                                    $(element).keyup(function(){
                                        var val1 = element.value;
                                        var num = new Number(val1);
                                        if(isNaN(num))
                                        {                                            
                                            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                                                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                                            }
                                            FocusedElement = element;
                                            $('#mensage').text('Please enter a valid number');
                                            $('#titulo').text('Atenction!');
                                            $('#dialoginfo').modal({
                                                backdrop:'static',
                                                keyboard:false  
                                            });                                            
                                        }
                                    })
                                }}},
            { label: 'Unity', name: 'unity', width: 75, editable: true , editoptions:{
                                size: 15, maxlengh: 10,
                                dataInit: function(element) {
                                    $(element).keyup(function(){
                                        var val1 = element.value;
                                        var num = new Number(val1);
                                        if(isNaN(num))
                                        {                                            
                                            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                                                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                                            }
                                            FocusedElement = element;
                                            $('#mensage').text('Please enter a valid number');
                                            $('#titulo').text('Atenction!');
                                            $('#dialoginfo').modal({
                                                backdrop:'static',
                                                keyboard:false  
                                            });                                            
                                        }
                                    })
                                }}},                    
            { label: 'Name', name: 'name', width: 310 },
            { label: 'Price', name: 'price', width: 140, align:'right', formatter: 'number', formatoptions: { decimalPlaces: 2 }, editable: true , editoptions:{
                                size: 15, maxlengh: 10,
                                dataInit: function(element) {
                                    $(element).keyup(function(){
                                        var val1 = element.value;
                                        var num = new Number(val1);
                                        if(isNaN(num))
                                        {                                            
                                            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                                                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                                            }
                                            FocusedElement = element;
                                            $('#mensage').text('Please enter a valid number');
                                            $('#titulo').text('Atenction!');
                                            $('#dialoginfo').modal({
                                                backdrop:'static',
                                                keyboard:false  
                                            });
                                        }
                                    })
                                }}},
            { label: 'Discount', name: 'discount', width: 100, align:'right', formatter: 'number', formatoptions: { decimalPlaces: 2 }, editable: true , editoptions:{
                                size: 15, maxlengh: 10,
                                dataInit: function(element) {
                                    $(element).keyup(function(){
                                        var val1 = element.value;
                                        var num = new Number(val1);
                                        if(isNaN(num))
                                        {                                            
                                            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                                                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                                            }
                                            FocusedElement = element;
                                            $('#mensage').text('Please enter a valid number');
                                            $('#titulo').text('Atenction!');
                                            $('#dialoginfo').modal({
                                                backdrop:'static',
                                                keyboard:false  
                                            });
                                        }
                                    })
                                }}},
            { label: 'Taxes', name: 'taxes', width: 100, align:'right', formatter: 'number', formatoptions: { decimalPlaces: 2 }, editable: true , editoptions:{
                                size: 15, maxlengh: 10,
                                dataInit: function(element) {
                                    $(element).keyup(function(){
                                        var val1 = element.value;
                                        var num = new Number(val1);
                                        if(isNaN(num))
                                        {                                            
                                            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                                                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                                            }
                                            FocusedElement = element;
                                            $('#mensage').text('Please enter a valid number');
                                            $('#titulo').text('Atenction!');
                                            $('#dialoginfo').modal({
                                                backdrop:'static',
                                                keyboard:false  
                                            });
                                        }
                                    })
                                }}},
            { label: 'Amount', name: 'amount', width: 150, align:'right', formatter: 'number', formatoptions: { decimalPlaces: 2 } }
        ],
        viewrecords: true,
        width: 930,
        height: 300,        
        gridComplete: function() {
            $('tr.jqgrow:even').addClass('myAltRowClass');
            $('tr.jqgrow:odd').addClass('myAltRowClass2');            
        },
        afterEditCell: function (rowid, cellname, value, iRow, iCol) {
            $('#jqGrid').jqGrid('setCell',rowid,cellname,'',{color:'black'});            
            var $editControl = $('#'+ rowid).find('input, select, textarea');
            var events = $._data($editControl[0], 'events');            
            $editControl[0].select();            
            var originalKeydown;
    
            if (events && events.keydown && events.keydown.length === 1) {
                
                originalKeydown = events.keydown[0].handler; // save old
        
                $editControl.unbind('keydown');
                $editControl.bind('keydown', function (e) {
                    // we can do something before jqGrid process "keydown" event
                    if (e.keyCode === 13) {
                        //console.log('Enter')
                        //console.log(iRow)                        
                    }
                    originalKeydown.call(this, e);
                    // we can do something after jqGrid process "keydown" event                    
                    if (e.keyCode === 13) {
                        if (iCol==0) {                                  
                            fillProduct($('#jqGrid').jqGrid('getCell',rowid,'code'),iRow,rowid);                            
                        }else if (iCol==1) {                            
                            CalcularImporte(rowid);
                            if ($('#jqGrid').jqGrid('getCell',rowid,'unity')!='') {
                                $('#jqGrid').jqGrid('editCell',  iRow, 3, true);
                                $('#' + iRow + "_" + 'price').select(); 
                            }else{
                                $('#jqGrid').jqGrid('setCell', rowid, 'unity', '0');
                                $('#jqGrid').jqGrid('editCell', rowid, 1, true);
                            }                            
                        }else if (iCol==3) {
                            CalcularImporte(rowid);
                            if ($('#jqGrid').jqGrid('getCell',rowid,'price')!='') {
                                $('#jqGrid').jqGrid('editCell',  iRow, 4, true);
                                $('#' + iRow + "_" + 'discount').select();
                            }else{
                                $('#jqGrid').jqGrid('setCell', rowid, 'price', '0');
                                $('#jqGrid').jqGrid('editCell', rowid, 3, true);
                            }                            
                        }else if (iCol==4) {
                            CalcularImporte(rowid);
                            if ($('#jqGrid').jqGrid('getCell',rowid,'discount')!='') {
                                $('#jqGrid').jqGrid('editCell',  iRow, 5, true);
                                $('#' + iRow + "_" + 'taxes').select();
                            }else{
                                $('#jqGrid').jqGrid('setCell', rowid, 'discount', '0');
                                $('#jqGrid').jqGrid('editCell', rowid, 4, true);
                            }                            
                        }else if (iCol==5) {                            
                            if ($('#jqGrid').jqGrid('getCell',rowid,'taxes')=='') {
                                $('#jqGrid').jqGrid('setCell', rowid, 'taxes', '0');
                            }
                            CalcularImporte(rowid);
                            if ($('#jqGrid').getGridParam('reccount')==iRow) {                                
                                jQuery('#jqGrid').jqGrid('addRowData', nRowId , { 'code': 0, 'unity': 1, 'name': 'Waiting for product...', 'price': 0, 'discount': 0, 'taxes': 0, 'amount': 0});
                                nRowId++;
                            }     
                            $('#jqGrid').jqGrid('editCell',  iRow+1, 0, true);
                            $('#' + (iRow+1) + "_" + 'code').select();                            
                        }
                    }else if (e.keyCode === 40) {
                        console.log($('#jqGrid').jqGrid('getCell',iRow,'code'))
                        if ($('#jqGrid').getGridParam('reccount')==iRow && value!=0) {                            
                            jQuery('#jqGrid').jqGrid('addRowData', nRowId , { 'code': 0, 'unity': 1, 'name': 'Waiting for product...', 'price': 0, 'discount': 0, 'taxes': 0, 'amount': 0});
                            $('#jqGrid').jqGrid('editCell',  iRow+1, 0, true);
                            e.preventDefault();
                            $('#' + (iRow+1) + "_" + 'code').select();
                            nRowId++;
                            $('#savebilldata').prop('disabled',false);
                        }else if ($('#jqGrid').getGridParam('reccount')!=iRow){                                                         
                            $('#jqGrid').jqGrid('editCell',  iRow+1, iCol, true);
                            if (iCol==0) {
                                e.preventDefault();
                                $('#' + (iRow+1) + "_" + 'code').select();
                            }else if (iCol==1) {
                                e.preventDefault();
                                $('#' + (iRow+1) + "_" + 'unity').select();
                            }else if (iCol==3) {
                                e.preventDefault();
                                $('#' + (iRow+1) + "_" + 'price').select();
                            }else if (iCol==4) {
                                e.preventDefault();
                                $('#' + (iRow+1) + "_" + 'discount').select();
                            }else if (iCol==5) {
                                e.preventDefault();
                                $('#' + (iRow+1) + "_" + 'taxes').select();
                            }                               
                        }
                    }else if (e.keyCode === 38 && iRow > 1) {                        
                        $('#jqGrid').jqGrid('editCell',  iRow-1, iCol, true);
                        if (iCol==0) {
                            e.preventDefault();
                            $('#' + (iRow-1) + "_" + 'code').select();
                        }else if (iCol==1) {
                            e.preventDefault();
                            $('#' + (iRow-1) + "_" + 'unity').select();
                        }else if (iCol==3) {
                            e.preventDefault();
                            $('#' + (iRow-1) + "_" + 'price').select();
                        }else if (iCol==4) {
                            e.preventDefault();
                            $('#' + (iRow-1) + "_" + 'discount').select();
                        }else if (iCol==5) {
                            e.preventDefault();
                            $('#' + (iRow-1) + "_" + 'taxes').select();
                        }
                    }
                });
            }
        }
    });
    
}
        
function fillProduct(value,iRow,rowid){
    
    $.ajax({
	statusCode:{500:function(){
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
                }                
                console.log($('#colortitulo').attr('class'))                
                $('#mensage').text('Error with the server');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                }); 
            }
        },
        headers: { 'x-access-token': AuthenticateToken },
        url: 'http://localhost:3000/fillproduct',                    
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({productCode:value}),
        success: function(data){
            console.log(data)
            if (data==null) {
                $('#jqGrid').jqGrid('setCell', rowid, 'name', 'Product not found');
                $('#jqGrid').jqGrid('setCell', rowid, 'price', '0.00');
                $('#jqGrid').jqGrid('setCell', rowid, 'discount', '0.00');
                $('#jqGrid').jqGrid('setCell', rowid, 'taxes', '0.00');
            }else{
                $('#jqGrid').jqGrid('setCell', rowid, 'name', data.name);
                $('#jqGrid').jqGrid('setCell', rowid, 'price', data.price);
                $('#jqGrid').jqGrid('setCell', rowid, 'discount', data.discount);
                $('#jqGrid').jqGrid('setCell', rowid, 'taxes', data.tax);
                $('#savebilldata').prop('disabled',false);
            }
            $('#jqGrid').trigger( 'reloadGrid' );
            CalcularImporte(rowid);
            $('#jqGrid').jqGrid('setSelection', iRow);
            if (data==null) {                
                $('#jqGrid').jqGrid('editCell',  iRow, 0, true);
                $('#' + (iRow) + "_" + 'code').select();
            }else{
                $('#jqGrid').jqGrid('editCell',  iRow, 1, true);
                $('#' + (iRow) + "_" + 'unity').select();
            }
        },                    
        error: function(error){
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
            }            
            console.log($('#colortitulo').attr('class'))            
            $('#mensage').text('Error with the server');
            $('#titulo').text('Atenction!');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });                        
        }
    });
    
}

function CalcularImporte(iRow){
    
    var Unity = $('#jqGrid').jqGrid('getCell',iRow,'unity');
    var Price = $('#jqGrid').jqGrid('getCell',iRow,'price');
    var Discount = $('#jqGrid').jqGrid('getCell',iRow,'discount');
    var Taxes = $('#jqGrid').jqGrid('getCell',iRow,'taxes');
    var Amount;
    
    Amount = (Unity * (Price - ((Price * Discount)/100))) + (((Unity * (Price - ((Price * Discount)/100))) * Taxes)/100);
    
    $('#jqGrid').jqGrid('setCell', iRow, 'amount', Amount);
    
    var TotalBill;
    
    var $grid = $('#jqGrid');
    TotalBill = $grid.jqGrid('getCol', 'amount', false, 'sum');
    
    $('#totalbill').val(TotalBill.toFixed(2));
    
}

function NewLine(){
    
    jQuery('#jqGrid').jqGrid('addRowData', nRowId, { 'code': 0, 'unity': 1, 'name': 'Waiting for product...', 'price': 0, 'discount': 0, 'taxes': 0, 'amount': 0});
    nRowId++;
    $('#savebilldata').prop('disabled',false); 
    
}

function DeleteLine(){
    
    var selectedRowId = jQuery('#jqGrid').jqGrid ('getGridParam', 'selrow');
    console.log(selectedRowId)
    jQuery('#jqGrid').jqGrid('delRowData',selectedRowId);
    
    if ($('#jqGrid').getGridParam('reccount')==0) {
        $('#savebilldata').prop('disabled',true); 
    }
    
}

function SaveBill(){
    
    if ($('#comercialnamebill').val()=='') {
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
        }                                
        $('#mensage').text('You must enter a comercial name');
        $('#titulo').text('Atenction!');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });
        return;
    }
    
    if ($('#datebill').val()=='') {
        if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
            $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning'); 
        }                                
        $('#mensage').text('You must enter a bill date');
        $('#titulo').text('Atenction!');
        $('#dialoginfo').modal({
            backdrop:'static',
            keyboard:false  
        });
        return;
    } 
    
    var aDetailBill = [];
    
    $('#jqGrid').jqGrid('editCell', 0, 0, false);    
    
    var ids = jQuery('#jqGrid').jqGrid('getDataIDs');
    for (var i = 0; i < ids.length; i++) {
        var rowId = ids[i];
        
        var Code = $('#jqGrid').jqGrid('getCell',rowId,'code');
        var Name = $('#jqGrid').jqGrid('getCell',rowId,'name');
        var Unity = $('#jqGrid').jqGrid('getCell',rowId,'unity');
        var Price = $('#jqGrid').jqGrid('getCell',rowId,'price');
        var Discount = $('#jqGrid').jqGrid('getCell',rowId,'discount');
        var Taxes = $('#jqGrid').jqGrid('getCell',rowId,'taxes');        
        
        if ((Code!='0') && (Name!='Product not found')){
            aDetailBill.push({ name:Name , unity:Unity , price:Price , discount:Discount , taxes:Taxes});
        }         
        
        console.log(rowId);
    }    
    
    console.log(aDetailBill)
    
    if (aDetailBill.length>0) {     
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
            url: 'http://localhost:3000/savebill',                    
            type: 'post',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({ clientId:$('#codeclient').val() , clientName:$('#comercialnamebill').val() , date:$('#datebill').val() , detail:aDetailBill}),
            success: function(data){
                console.log(data)
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                    $('#colortitulo').removeClass('modal-header modal-header-warning').addClass('modal-header modal-header-info'); 
                }            
                $('#mensage').text('The bill was saved');
                $('#titulo').text('Informaction');
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
        $('#savebilldata').prop('disabled',true);
    }
    
}
