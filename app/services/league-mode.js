import Service, { inject } from '@ember/service';

export default Service.extend({
  currentDocument: inject('-document'),
  LEAGUE_MODE_THEME_COLOR: 'black',
  init () {
    this._super(...arguments)
    const document = this.get('currentDocument')
    const themeColorMetaElement = document.getElementById('theme-color-meta')
    this.set('themeColorInitialValue', themeColorMetaElement.content)
    this.themeColorMetaElement = themeColorMetaElement
  },
  enable () {
    const document = this.get('currentDocument')
    const body = document.body
    addClass(body, 'league-mode')
    this.themeColorMetaElement.setAttribute('content', this.LEAGUE_MODE_THEME_COLOR)
  },
  disable () {
    const document = this.get('currentDocument')
    const body = document.body
    removeClass(body, 'league-mode')
    this.themeColorMetaElement.setAttribute('content', this.get('themeColorInitialValue'))
  }
})

function addClass(element, klass) {
  if(typeof FastBoot === 'undefined') {
    element.classList.add(klass);
  } else {
    let existingClass = element.getAttribute('class') || '';

    if(existingClass) {
      let classes = existingClass.split(' ');

      if(classes.includes(klass)) {
        return
      }

      element.setAttribute('class', `${existingClass} ${klass}`);
    } else {
      element.setAttribute('class', klass);
    }
  }
}

function removeClass(element, klass) {
  if(typeof FastBoot === 'undefined') {
    element.classList.remove(klass);
  } else {
    let existingClass = element.getAttribute('class')
    element.setAttribute('class', existingClass.replace(klass, ''));
  }
}
