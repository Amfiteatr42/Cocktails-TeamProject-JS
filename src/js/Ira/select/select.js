const getRender = () => {
    return `
    <div class="select__input" data-type="input">A<i class="fa fa-chevron-down" aria-hidden="true" data-type="arrow"></i></div>
    <div class="select__dropdown">
      <ul class="letter-list">
        <li class="letter">B</li>
        <li class="letter">C</li>
        <li class="letter">D</li>
        <li class="letter">E</li>
      </ul>
    </div>
    `;
}

export class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.#render()
        this.#setup()
    }

    #render() {
        this.$el.classList.add('select');
        this.$el.innerHTML = getRender();
    }

    #setup() {
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')

    }

    clickHandler(event) {
        const {type} = event.target.dataset
        console.log(type)

        if (type === 'input') {
            this.toggle()
        }

    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$el.classList.add('open')
        this.$arrow.classList.remove('fa-chevron-down')
        this.$arrow.classList.add('fa-chevron-up')
    }

   close() {
        this.$el.classList.remove('open')
        this.$arrow.classList.add('fa-chevron-down')
        this.$arrow.classList.remove('fa-chevron-up')
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler)
    }
}