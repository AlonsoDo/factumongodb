var ProductIndex = 0;
var aProducts = [];
var UpdateModeProduct = 'Update';
var BufferProductCode;
var BufferProductName;
var BufferProductPrice;
var BufferProductTax;
var BufferProductDiscount;
var BufferProductStock;

function createProduct(){
    
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
        url: 'http://localhost:3000/newproduct',                    
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({stock:$('#productstock').val(),name:$('#productname').val(),
                                    price:$('#productprice').val(),tax:$('#producttaxes').val(),
                                    discount:$('#productdiscount').val()}),
        success: function(data){
            //Add new product at the end of array            
            aProducts.push({productId:data.ProductCode,companyId:data.CompanyCode,
                                   stock:$('#productstock').val(),name:$('#productname').val(),
                                   price:$('#productprice').val(),tax:$('#producttaxes').val(),
                                   discount:$('#productdiscount').val()});            
            $('#codeproduct').val(data.ProductCode);
            ProductIndex = aProducts.length - 1;
            if (aProducts.length>1) {
                $('#PrevProduct').prop('disabled',false);
                $('#IniProduct').prop('disabled',false);
            }
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                $('#colortitulo').removeClass('modal-header modal-header-warning').addClass('modal-header modal-header-info');  
            } 
            $('#mensage').text('New product create');
            $('#titulo').text('Information');
            $('#dialoginfo').modal({
                backdrop:'static',
                keyboard:false  
            });
            ActiveProduct();
            BufferingProductData();
            $('#DeleteProduct').prop('disabled',false);
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

function updateProduct(){
        
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
        url: 'http://localhost:3000/updateproduct',                    
        type: 'put',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({productId:$('#codeproduct').val(),stock:$('#productstock').val(),name:$('#productname').val(),
                                     price:$('#productprice').val(),tax:$('#producttaxes').val(),discount:$('#productdiscount').val()}),        
        success: function(data){            
            aProducts[ProductIndex].stock = $('#productstock').val();
            aProducts[ProductIndex].name = $('#productname').val();
            aProducts[ProductIndex].price = $('#productprice').val();
            aProducts[ProductIndex].tax = $('#producttaxes').val();
            aProducts[ProductIndex].discount = $('#productdiscount').val();
            BufferingProductData();
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                $('#colortitulo').removeClass('modal-header modal-header-warning').addClass('modal-header modal-header-info'); 
            } 
            $('#mensage').text('Product update');
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

function searchProducts(){
    
    var OrderSearch = $('#searchproduct option:selected').val();
        
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
        url: 'http://localhost:3000/searchproducts',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({contentsearchproduct:$('#contentsearchproduct').val(),orderresult:OrderSearch}),
        success: function(data){             
            $('#NextProduct').prop('disabled',true);
            $('#EndProduct').prop('disabled',true);
            $('#PrevProduct').prop('disabled',true);
            $('#IniProduct').prop('disabled',true);
            aProducts = eval(data);
            if (aProducts.length==0) {
                $('#codeproduct').val('0');
                $('#productstock').val('0');
                $('#productname').val('');
                $('#productprice').val('0');
                $('#producttaxes').val('0');
                $('#productdiscount').val('0');
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                } 
                $('#mensage').text('No product found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });
            }else if (aProducts.length==1) {
                ProductIndex = 0;
                LoadProductData();
                ActiveProduct();
                BufferingProductData();
                $('#DeleteProduct').prop('disabled',false);
            }else{                
                ProductIndex = 0;
                LoadProductData();
                ActiveProduct();
                BufferingProductData();
                $('#NextProduct').prop('disabled',false);
                $('#EndProduct').prop('disabled',false);
                $('#DeleteProduct').prop('disabled',false);
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

function searchProductsFilter(){
    
    var OrderSearch = $('#searchproduct option:selected').val();
        
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
        url: 'http://localhost:3000/searchproductsfilter',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({contentsearchproduct:$('#contentsearchproduct').val(),orderresult:OrderSearch}),
        success: function(data){             
            $('#NextProduct').prop('disabled',true);
            $('#EndProduct').prop('disabled',true);
            $('#PrevProduct').prop('disabled',true);
            $('#IniProduct').prop('disabled',true);
            aProducts = eval(data);
            if (aProducts.length==0) {
                $('#codeproduct').val('0');
                $('#productstock').val('0');
                $('#productname').val('');
                $('#productprice').val('0');
                $('#producttaxes').val('0');
                $('#productdiscount').val('0');
                if (($('#colortitulo').attr('class'))=='modal-header modal-header-info'){
                    $('#colortitulo').removeClass('modal-header modal-header-info').addClass('modal-header modal-header-warning');  
                } 
                $('#mensage').text('No product found');
                $('#titulo').text('Atenction!');
                $('#dialoginfo').modal({
                    backdrop:'static',
                    keyboard:false  
                });
            }else if (aProducts.length==1) {
                ProductIndex = 0;
                LoadProductData();
                ActiveProduct();
                BufferingProductData();
                $('#DeleteProduct').prop('disabled',false);
            }else{                
                ProductIndex = 0;
                LoadProductData();
                ActiveProduct();
                BufferingProductData();
                $('#NextProduct').prop('disabled',false);
                $('#EndProduct').prop('disabled',false);
                $('#DeleteProduct').prop('disabled',false);
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

function deleteProduct(){
    
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
        url: 'http://localhost:3000/deleteproduct',                    
        type: 'delete',
        contentType: 'application/json; charset=utf-8',
	data: JSON.stringify({productId:$('#codeproduct').val()}),
        success: function(data){
            //Update array
            aProducts.splice(ProductIndex,1);
            if (aProducts.length==0){
                DeactiveProduct();
                $('#productstock').val('0');
                $('#productname').val('');
                $('#productprice').val('0');
                $('#producttaxes').val('0');
                $('#productdiscount').val('0');                                    
                $('#SaveProduct').prop('disabled',true);
                $('#ResetProduct').prop('disabled',true);
                $('#NewProduct').prop('disabled',false);
                $('#DeleteProduct').prop('disabled',true);
            }else{
                ProductIndex--;
                if (ProductIndex<0) {
                    ProductIndex = 0;
                    $('#PrevProduct').prop('disabled',true);
                    $('#IniProduct').prop('disabled',true);
                }
                LoadProductData();
                BufferingProductData();                
                if (aProducts.length==1){
                    $('#PrevProduct').prop('disabled',true);
                    $('#IniProduct').prop('disabled',true);
                    $('#NextProduct').prop('disabled',true);
                    $('#EndProduct').prop('disabled',true); 
                }
            }
            if (($('#colortitulo').attr('class'))=='modal-header modal-header-warning'){
                $('#colortitulo').removeClass('modal-header modal-header-warning').addClass('modal-header modal-header-info');  
            } 
            $('#mensage').text('Product delete');
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

function LoadProductData(){
    
    $('#codeproduct').val(aProducts[ProductIndex].productId);
    $('#productstock').val(aProducts[ProductIndex].stock);
    $('#productname').val(aProducts[ProductIndex].name);
    $('#productprice').val(aProducts[ProductIndex].price);
    $('#producttaxes').val(aProducts[ProductIndex].tax);
    $('#productdiscount').val(aProducts[ProductIndex].discount);    
    
}

function BufferingProductData(){
    
    BufferProductCode = $('#codeproduct').val();
    BufferProductName = $('#productname').val();
    BufferProductPrice = $('#productprice').val();
    BufferProductTax = $('#producttaxes').val();
    BufferProductDiscount = $('#productdiscount').val();
    BufferProductStock = $('#productstock').val();                
    
}

function DeactiveProduct(){
    
    $('#productname').prop('disabled',true);
    $('#productprice').prop('disabled',true);
    $('#producttaxes').prop('disabled',true);
    $('#productdiscount').prop('disabled',true);
    $('#productstock').prop('disabled',true);    
    
}

function ActiveProduct(){
    
    $('#productname').prop('disabled',false);
    $('#productprice').prop('disabled',false);
    $('#producttaxes').prop('disabled',false);
    $('#productdiscount').prop('disabled',false);
    $('#productstock').prop('disabled',false); 
    
}

function ResetProduct(){
    
    if (aProducts.length>0) {
        LoadProductData();
    }else{
        DeactiveProduct();
        $('#codeproduct').val('0');
        $('#productstock').val('0');
        $('#productname').val('');
        $('#productprice').val('0');
        $('#producttaxes').val('0');
        $('#productdiscount').val('0');
    }                
    $('#SaveProduct').prop('disabled',true);
    $('#ResetProduct').prop('disabled',true);
    $('#NewProduct').prop('disabled',false);
    $('#DeleteProduct').prop('disabled',false);
    
}

function nextProduct(){
    
    if (aProducts.length>1) {
        $('#PrevProduct').prop('disabled',false);
        $('#IniProduct').prop('disabled',false);
    }
    
    ProductIndex++;
    if (ProductIndex==aProducts.length-1){        
        $('#NextProduct').prop('disabled',true);
        $('#EndProduct').prop('disabled',true);
    }
    
    LoadProductData();
    
    BufferingProductData();
    
    $('#SaveProduct').prop('disabled',true);
    $('#ResetProduct').prop('disabled',true);
    $('#NewProduct').prop('disabled',false);
    $('#DeleteProduct').prop('disabled',false);
    
}

function prevProduct(){
    
    if (aProducts.length>1) {
        $('#NextProduct').prop('disabled',false);
        $('#EndProduct').prop('disabled',false);
    }
    
    ProductIndex--;
    if (ProductIndex==0){        
        $('#PrevProduct').prop('disabled',true);
        $('#IniProduct').prop('disabled',true);
    }
    
    LoadProductData();
    
    BufferingProductData();
    
    $('#SaveProduct').prop('disabled',true);
    $('#ResetProduct').prop('disabled',true);
    $('#NewProduct').prop('disabled',false);
    $('#DeleteProduct').prop('disabled',false);
        
}

function iniProduct(){
    
    if (aProducts.length>1) {
        $('#NextProduct').prop('disabled',false);
        $('#EndProduct').prop('disabled',false);
    }
    
    ProductIndex=0;
    $('#PrevProduct').prop('disabled',true);
    $('#IniProduct').prop('disabled',true);
    
    LoadProductData();
    
    BufferingProductData();
    
    $('#SaveProduct').prop('disabled',true);
    $('#ResetProduct').prop('disabled',true);
    $('#NewProduct').prop('disabled',false);
    $('#DeleteProduct').prop('disabled',false);
    
}

function endProduct(){
    
    if (aProducts.length>1) {
        $('#PrevProduct').prop('disabled',false);
        $('#IniProduct').prop('disabled',false);
    }
    
    ProductIndex = aProducts.length - 1;
    $('#NextProduct').prop('disabled',true);
    $('#EndProduct').prop('disabled',true);    
        
    LoadProductData();
    
    BufferingProductData();
    
    $('#SaveProduct').prop('disabled',true);
    $('#ResetProduct').prop('disabled',true);
    $('#NewProduct').prop('disabled',false);
    $('#DeleteProduct').prop('disabled',false);
    
}

function SendProductData(){
    
    var nAmount = (parseFloat($('#productprice').val()) - (parseFloat($('#productprice').val()) * (parseFloat($('#productdiscount').val())/100))) + ((parseFloat($('#productprice').val()) - (parseFloat($('#productprice').val()) * (parseFloat($('#productdiscount').val())/100))) * (parseFloat($('#producttaxes').val())/100));
    
    if ($('#productname').val() != ''){
        
        jQuery('#jqGrid').jqGrid('addRowData', nRowId , { 'code': $('#codeproduct').val(), 'unity': 1, 'name': $('#productname').val(), 'price': parseFloat($('#productprice').val()), 'discount': parseFloat($('#productdiscount').val()), 'taxes': parseFloat($('#producttaxes').val()), 'amount': nAmount});
        nRowId++;
        $('#savebilldata').prop('disabled',false);
        
        var TotalBill;
    
        var $grid = $('#jqGrid');
        TotalBill = $grid.jqGrid('getCol', 'amount', false, 'sum');
        
        $('#totalbill').val(TotalBill.toFixed(2));
        
    }
    
}