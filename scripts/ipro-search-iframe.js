;(function () {
  var ipro_search_page = 'https://secure.rumseyofsandbanks.co.uk/search/'

  function setWidget(params) {
    var location

    if (arguments[0] === '') {
      location = 'All'
    } else {
      location = arguments[0]
    }

    //console.log(location);

    var content =
      '<iframe id="ipro_search_result"  src="' +
      ipro_search_page +
      '?location=' +
      location +
      '&checkin=' +
      arguments[1] +
      '&amp;checkout=' +
      arguments[2] +
      '&adults=' +
      arguments[3] +
      '&children=' +
      arguments[4] +
      '&infants=' +
      arguments[5] +
      '&attrs=' +
      arguments[6] +
      '&keyword=' +
      arguments[7] +
      '&formid=7414' +
      '" scrolling="yes" seamless="seamless" ></iframe>'

    if (window.jQuery) {
      jQuery('#wd_id').html(content)
    } else {
      document.getElementById('wd_id').innerHTML = content
    }
  }

  var queryParams = {},
    args = location.search.substr(1).split(/&/)
 
  for (var i = 0; i < args.length; ++i) {
    var tmp = args[i].split(/=/)
    if (tmp[0] != '') {
      var n = decodeURIComponent(tmp[0])
      var v = decodeURIComponent(tmp.slice(1).join('').replace('+', ' '))
      if (queryParams[n]) {
        v = v + ',' + queryParams[n]
      }
      queryParams[n] = v
    }
  }

  console.log(queryParams);


  function setUpForm(params){
    const form = document.getElementById('searchform');
 
    if (Object.keys(params).length === 0 || form == null){
      return false;
    }
    
    let attrs = [];
    let attrString = "attrs[]";
    [...form.elements].forEach((item) => {
      let attr = item.getAttribute("name");

      if (attr != null ){
        if (item.getAttribute("type") == "checkbox" && params[attrString] ) {
          if (params[attrString].includes(item.getAttribute("value"))) {
            item.checked = true;
          }
        } else {
          item.value = "" + params[attr] + "";
        }
      }
    });

    if (params['checkin'] != "" && params['checkout']){
      $("#dates").attr("value", params['checkin'] + " - " + params['checkout']);
    }

    var guestTotal = parseInt(params['adults']) + parseInt(params['children']) + parseInt(params['infants']);
    $('#guests').text("Guests " + guestTotal);

  };

  setUpForm(queryParams);

  function getQuery(key) {
    var val = queryParams[key]
    if (val) {
      return val
    } else {
      return ''
    }
  }

  function onloadSetWidget() {
    setWidget(
      //getQuery("nights"),
      getQuery('location'),
      getQuery('checkin'),
      getQuery('checkout'),
      getQuery('adults'),
      getQuery('children'),
      getQuery('infants'),
      getQuery('attrs[]'),
      getQuery('keyword')
    )
  }

 

  if (window.jQuery) {
    jQuery(document).ready(onloadSetWidget)
  } else {
    if (window.attachEvent) {
      window.attachEvent('onload', onloadSetWidget)
    } else if (window.addEventListener) {
      window.addEventListener('load', onloadSetWidget, false)
    }
  }

  setTimeout(function () {
    $('#wd_id iframe').iFrameResize({
      checkOrigin: true,
      scrolling: false,
      enablePublicMethods: true,
      heightCalculationMethod: null,
    });
  }, 1000);



})()
