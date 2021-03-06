import React from 'react';
import Line from './line';
import styled from 'styled-components';
import View from '../block/view';

const Viewer = styled.div`
    width: calc(100% - 30px);
    height: 200px;
    margin: 0 auto;
    margin-top: 15px;
    position: relative;
`;
const Content = styled.div`
    width: calc(100% - 35px);
    height: 40px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 15px;
    display: flex;
    justify-content: center
`;
const Button = styled.div`
    width: 25px;
    height: 25px;
    background-image: ${props => 'url(data:image/svg+xml, '+encodeURIComponent('<svg version="1.1" id="Camada_1" focusable="false" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M6,19c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V7H6V19z M19,4h-3.5l-1-1h-5l-1,1H5v2h14V4z"/></svg>')+')'};
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    float: right;
    margin-left: 10px;
    cursor: pointer;
`;

const Bar = styled.div`
    width: 100%; 
    height: 40px;
    padding: 7.5px 10px;
    box-sizing: border-box;
`;

const Btn = styled.button`
    width: 40px;
    height: 40px;
    background-color: transparent;
    margin: 0px 7.5px;
    border:none;
    background-color: ${props => props.select == parseInt(props.type) ? 'var(--color-primary)' : 'transparent' };
    background-image: url(data:image/svg+xml, ${props => {
        if(props.type == '0') return encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M1045,80v960H80V80H1045 M1125,0H0v1120h1125V0L1125,0z"/></g></svg>');
        else if(props.type == '1') return encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M0,0v301v819h1125V301V0H0z M1045,1040H80V381h965V1040z M80,301V80h965v221H80z"/></g></svg>');
        else if(props.type == '2') return encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M602.5,0h-80H0v1120h522.5h80H1125V0H602.5z M1045,80v440H602.5V80H1045z M522.5,80v440H80V80H522.5z M80,1040V600h442.5 v440H80z M602.5,1040V600H1045v440H602.5z"/></g></svg>');
        else if(props.type == '3') return encodeURIComponent('<svg version="1.1" id="Camada_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1125 1120" style="enable-background:new 0 0 1125 1120;" xml:space="preserve"><g><path fill="'+document.documentElement.style.getPropertyValue('--text-color')+'" d="M819,0H0v301v518v301v0h306h819V819V301V0v0H819z M739,739H386V381h353V739z M819,381h226v358H819V381z M386,1040V819h353 v221H386z M306,739H80V381h226V739z M386,301V80h353v221H386z M80,80h226v221H80V80z M306,819v221H80V819H306z M1045,1040H819V819 h226V1040z M819,301V80h226v221H819z"/></g></svg>');
    }});
    background-repeat: no-repeat;
    background-size: ${props => props.select == parseInt(props.type) ? '80%' : '100%' };
    background-position: center;
    transition: all 0.5s;
`;

export default function Block({get, set, id}){
    const remove = () => {
        const data = Object.assign({}, get);
        let arr = data.block.movable.blocks.filter((value, i) => {
            if(i !== id) return value;
        });

        if(arr.length > 0) data.block.movable.blocks = arr;
        data.block.open({key: undefined});
        set(data);
    };

    const change = (type, key) => {
        const data = Object.assign({}, get);
        
        if(key != undefined) data.block.movable.blocks[id].data[key] = type;
        else data.block.movable.blocks[id].type = type;
        set(data);
    }

    let type = get.block.movable.blocks[id].type;
    return <>
        <Bar>
            <Button onClick={remove} />
        </Bar>
        <Viewer>
            <View open={get.open} type={type} size='50px' color={get.block.movable.blocks[id].data} edit={change} />
        </Viewer>

        <h4 style={{textAlign: 'center', marginTop: '15px'}}>Choose a block type</h4>
        <Content>
            <Btn onClick={() => change(0)} type='0' select={get.block.movable.blocks[id].type} />
            <Btn onClick={() => change(1)} type='1' select={get.block.movable.blocks[id].type} />
            <Btn onClick={() => change(2)} type='2' select={get.block.movable.blocks[id].type} />
            <Btn onClick={() => change(3)} type='3' select={get.block.movable.blocks[id].type} />
        </Content>
    </>;
}