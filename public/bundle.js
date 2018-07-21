// global window
const { el, mount } = window.redom
const { frames, ease } = window.animationframes

var names = [
  'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon',
  'charizard', 'squirtle', 'wartortle', 'blastoise', 'caterpie',
  'metapod', 'butterfree', 'weedle', 'kakuna', 'beedrill', 'pidgey',
  'pidgeotto', 'pidgeot', 'rattata', 'raticate', 'spearow', 'fearow',
  'ekans', 'arbok', 'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoranf',
  'nidorina', 'nidoqueen', 'nidoranm', 'nidorino', 'nidoking', 'clefairy',
  'clefable', 'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat' , 'golbat',
  'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat', 'venomoth',
  'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck', 'golduck', 'mankey',
  'primeape', 'growlithe', 'arcanine', 'poliwag', 'poliwhirl', 'poliwrath',
  'abra', 'kadabra', 'alakazam', 'machop', 'machoke', 'machamp', 'bellsprout',
  'weepinbell', 'victreebel', 'tentacool', 'tentacruel', 'geodude', 'graveler',
  'golem', 'ponyta', 'rapidash', 'slowpoke', 'slowbro', 'magnemite', 'magneton',
  'farfetchd', 'doduo', 'dodrio', 'seel', 'dewgong', 'grimer', 'muk', 'shellder',
  'cloyster', 'gastly', 'haunter', 'gengar', 'onix', 'drowzee', 'hypno',
  'krabby', 'kingler', 'voltorb', 'electrode', 'exeggcute', 'exeggutor',
  'cubone', 'marowak', 'hitmonlee', 'hitmonchan', 'lickitung', 'koffing',
  'weezing', 'rhyhorn', 'rhydon', 'chansey' ,'tangela', 'kangaskhan',
  'horsea', 'seadra', 'goldeen', 'seaking', 'staryu', 'starmie',
  'mrmime', 'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros',
  'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee', 'vaporeon',
  'jolteon', 'flareon', 'porygon', 'omanyte', 'omastar', 'kabuto',
  'kabutops', 'aerodactyl', 'snorlax', 'articuno', 'zapdos', 'moltres',
  'dratini', 'dragonair', 'dragonite', 'mewtwo', 'mew'
]

// root dirs for image slides
var bg_root = 'assets/pkmn-bg/'
var pkmn_root = 'assets/pkmn/'

var audio = el(
  'video',
  {
    controls: '',
    autoplay: '',
    loop: true,
    src: 'assets/national-park-theme-pkmn-crystal.mp3',
    type: 'audio/mpeg'
  }
)

mount( document.body, audio )

// slideshow containers
var bs = document.querySelector( '#slideshow_bg' )
var ps = document.querySelector( '#slideshow_fn' )

var max = 151
var counter = 0

var current = null
var next = null

// ref: https://github.com/talmobi/animationframes
function translate ( x, y ) {
  return `translate( ${ x }px, ${ y }px )`
}

function nextSlide () {
  if ( current ) {
    // slide old images out
    ;( function () {
      const el = current.bg
      frames( 0, 1700 )
      .start( function () {
        el.style.transform = translate( 0, 0 )
      } )
      .progress( function ( t ) {
        const e = ease.cubicInOut( t )
        const w = el.width
        const x = ( w ) * ( 1 - e )

        el.style.transform = translate( w - x, 0 )
      } )
      .end( function () {
        el.parentNode.removeChild( el )
      } )
    } )()

    ;( function () {
      const el = current.pkmn
      frames( 0, 2000 )
      .start( function () {
        el.style.transform = translate( 0, 0 )
      } )
      .progress( function ( t ) {
        const e = ease.cubicInOut( t )
        const w = window.innerWidth + el.width
        const x = ( w ) * ( 1 - e )

        el.style.transform = translate( x - w, 0 )
      } )
      .end( function () {
        el.parentNode.removeChild( el )
      } )
    } )()
  }

  if ( next ) {
    // slide next images into view
    ;( function () {
      const el = next.bg
      frames( 0, 1500 )
      .start( function () {
        const w = -el.width
        el.style.transform = translate( w, 0 )

        el.style.display = ''
      } )
      .progress( function ( t ) {
        const e = ease.cubicInOut( t )
        const w = -el.width
        const x = ( w ) * ( 1 - e )

        el.style.transform = translate( x, 0 )
      } )
      .end( function () {
        // done
      } )
    } )()

    var currentPKMN = next.pkmn
    var w = currentPKMN.width
    var h = currentPKMN.height
    var amount = '45%'
    var c = ( counter + 1 )
    if ( c == 99 || c == 149 ) {
      // adjust a bit for peculiarly sized pokemon
      // so they look better
      amount = '40%'
    }
    currentPKMN.style.bottom = amount
    // place image off the screen to the right

    ;( function () {
      const el = currentPKMN
      frames( 0, 1800 )
      .start( function () {
        el.style.transform = translate(
          window.innerWidth + el.width,
          0
        )

        currentPKMN.style.display = ''
      } )
      .progress( function ( t ) {
        const e = ease.cubicInOut( t )
        const x = ( window.innerWidth + el.width ) * ( 1 - e )
        // const x = ( window.innerWidth / 5 - w / 3 ) * ( 1 - e )

        el.style.transform = translate(
          x,
          0
        )
      } )
      .end( function () {
        // done
      } )
    } )()
  }

  // swap
  current = next
  next = null

  // load next imgs
  var n = ( counter + 1 )
  if ( n > max ) {
    n -= max
  }
  next = {
    bg: el( 'img', {
      id: 'bgID_' + n,
      src: ( bg_root + names[ counter % max ] + '.jpg' ),
      style: {
        display: 'none',
        overflow: 'hidden'
      }
    } ),
    pkmn: el( 'img', {
      id: 'pkmnID_' + n,
      src: ( pkmn_root + zstr( n ) + n + '.png' ),
      style: {
        display: 'none',
        overflow: 'hidden'
      }
    } )
  }

  // setup next images
  next.bg.style.overflow = 'hidden'
  next.bg.style.display = 'none'

  next.pkmn.style.overflow = 'hidden'
  next.pkmn.style.display = 'none'

  // append them to the page for hidden preloading
  bs.appendChild( next.bg )
  ps.appendChild( next.pkmn )

  counter++
}

// friendly loop to automate slideshow
function timeout() {
  setTimeout( function () {
    nextSlide()
    timeout()
  }, ( counter < 1 ) ? 0 : 3000 )
}

var hello = el( '#hello',
  'Click Me!'
)

mount( document.body, hello )

function start () {
  hello.parentNode.removeChild( hello )
}

var started = false
window.onclick = function ( evt ) {
  console.log( 'clicked' )
  evt.preventDefault()

  if ( !started ) {
    started = true
    timeout()
    audio.play()
    start()
  }
}

function zstr(n) {
  var z = ''
  if (n < 10)
    z += '0'
  if (n < 100)
    z += '0'
  return z
}
