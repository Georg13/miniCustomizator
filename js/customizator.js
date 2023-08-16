export default class Customizator {
    constructor() {
        this.btnBlock = document.createElement('div');
        this.colorPicker = document.createElement('input');

        // localStorage 
        this.clear = document.createElement('div');
        this.scale = localStorage.getItem('scale') || 1;
        this.color = localStorage.getItem('color') || '#ffffff';

        this.clear.addEventListener('click', () => this.reset());
        // end localStorage

        this.btnBlock.addEventListener('click', (e) => this.onScaleChange(e));
        this.colorPicker.addEventListener('input', (e) => this.onColorChange(e));
    }

    // text resizing function
    onScaleChange(e) {
        const body = document.querySelector('body');
        if (e) {
            this.scale = +e.target.value.replace(/x/g, "");
        }

        const recursy = (elemnt) => {
            elemnt.childNodes.forEach(node => {
                if(node.nodeName === '#text' && node.nodeValue.replace(/\s+/g, "").length > 0 && (node.parentNode.getAttribute('class') !== 'clear')) {
                          
                    if (!node.parentNode.getAttribute('data-fz')) {
                        let value = window.getComputedStyle(node.parentNode, null).fontSize;
                        // save base values
                        node.parentNode.setAttribute('data-fz', +value.replace(/px/g, "")); 
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * this.scale + "px"; 
                    } else {
                        node.parentNode.style.fontSize = node.parentNode.getAttribute('data-fz') * this.scale + "px";
                    }
                    
                } else {
                    recursy(node)
                }
            });
        }

        recursy(body);

        localStorage.setItem('scale', this.scale);
    }

    // color change function
    onColorChange(e){
        const body = document.querySelector('body');
        body.style.backgroundColor = e.target.value;
        
        // localStorage 
            localStorage.setItem('color', e.target.value);
        // end localStorage 
    }

    /* color setting  */
    setBgColor() {
        const body = document.querySelector('body');
        body.style.backgroundColor = this.color;
        this.colorPicker.value = this.color;
    }

// styles setting in head  (! only CSS)
    injectStyle() {
        const style = document.createElement('style');
        style.innerHTML = `
            .panel {
                display: flex;
                justify-content: space-around;
                align-items: center;
                position: fixed;
                top: 10px;
                right: 0;
                border: 1px solid rgba(0,0,0, .2);
                box-shadow: 0 0 20px rgba(0,0,0, .5);
                width: 300px;
                height: 60px;
                background-color: #fff;
            
            }
            
            .scale {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100px;
                height: 40px;
            }
            .scale_btn {
                display: block;
                width: 40px;
                height: 40px;
                border: 1px solid rgba(0,0,0, .2);
                border-radius: 4px;
                font-size: 18px;
            }
            .color {
                width: 40px;
                height: 40px;
            }

            /* localStorage */
            .clear {
                font-size: 25px;
                font-weight: 700;
                cursor: pointer;
                border: 1px solid gray;
                padding: 0px 7px;
                border-radius: 5px;
            }
        `;

        document.querySelector('head').appendChild(style);
    }

    // localStorage 
    reset() {
        localStorage.clear();
        this.scale = 1;
        this.color = "#ffffff";
        this.setBgColor();
        this.onScaleChange();
    }
    // /localStorage 

    render() {
        // localStorage 
        this.injectStyle();
        this.setBgColor();
        this.onScaleChange();
        // /localStorage 

        let scaleInputS = document.createElement('input'),
            scaleInputM = document.createElement('input'),
            panel = document.createElement('div');

        // panel.append(this.btnBlock, this.colorPicker);
        
        // localStorage
        panel.append(this.btnBlock, this.colorPicker, this.clear);
        this.clear.innerHTML = "&times";
        this.clear.classList.add('clear');
        // /localStorage

        scaleInputS.classList.add('scale_btn');
        scaleInputM.classList.add('scale_btn');
        this.btnBlock.classList.add('scale');
        this.colorPicker.classList.add('color');
        
        /* change attributs */
        scaleInputS.setAttribute('type', 'button');
        scaleInputS.setAttribute('value', '1x');
        scaleInputM.setAttribute('type', 'button');
        scaleInputM.setAttribute('value', '1.5x');
        this.colorPicker.setAttribute('type', 'color');
        this.colorPicker.setAttribute('value', '#ffffff');
        /* end change attributs */

        this.btnBlock.append(scaleInputS, scaleInputM);

        panel.classList.add('panel');

        document.querySelector('body').append(panel);
    }
}