import eruda from 'eruda'
let el =document.createElement('div');
document.body.appendChild(el);
eruda.init({
    container:el,
    tool:['console','elements','network','sources','info','snippets'],
    useShadowDom:true
});