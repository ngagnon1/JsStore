window.Store = classCreator.create("Store",{

  "_constructor" : function(){
    this.data = {};
    this.listeners = [];
  }

  ,"fireChange" : function(change){
    for( var i = 0; i < this.listeners.length; i++ ){
      this.listeners[i](change);
    }
  }

  ,"get" : function(pName){
    var nameArr = pName.split('.');
    var ret = this.data;
    nameArr.forEach( function(namePart){
      if( typeof(ret[namePart]) == "undefined" ){
        return null;
      }
      ret = ret[namePart];
    } );
    if( typeof(ret) == "object" )
      return $.extend(true, Array.isArray(ret)?[]:{}, ret );
    else
      return ret;
  }

  ,"set" : function(pName,pVal){
    var nameArr = pName.split('.');
    var target = this.data;
    nameArr.forEach( function(namePart,index){
      if( index < nameArr.length-1 ){
        if( typeof(target[namePart]) == "undefined" ){
          target[namePart] = {};
        }
        target = target[namePart];
      }
      else{
        target[namePart] = pVal;
      }
    } );
  }

  ,"push" : function(pName,pVal){
    if( typeof(pVal) != "undefined" ){

      var nameArr = pName.split('.');
      var target = this.data;
      nameArr.forEach( function(namePart,index){
        if( index < nameArr.length-1 ){
          if( typeof(target[namePart]) == "undefined" ){
            target[namePart] = {};
          }
          target = target[namePart];
        }
        else{
          if( typeof(target[namePart]) == "undefined" ){
            target[namePart] = [];
          }
          target[namePart].push( pVal );
        }
      } );
    }
  }

  ,"remove" : function(pName){
    var nameArr = pName.split('.');
    var target = this.data;
    nameArr.forEach( function(namePart,index){
      if( index < nameArr.length-1 ){
        if( typeof(target[namePart]) == "undefined" ){
          return;
        }
        target = target[namePart];
      }
      else{
        if( typeof(target) == "object" ){
          if( Array.isArray(target) ){
            target.splice(namePart,1);
          }
          else{
            delete target.namePart;
          }
        }
      }
    } );
  }
});
