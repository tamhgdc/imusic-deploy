import React,{ useEffect, useState, useRef } from 'react';
import './NavBar.css';
import { Row, Col, Input,Tooltip } from 'antd';

import { AiOutlineSearch, AiOutlineSetting, AiOutlineHistory,  } from 'react-icons/ai';
import { IoMdNotificationsOutline, IoIosTrendingUp } from 'react-icons/io'
import { RiPlayListLine, RiUserStarLine } from 'react-icons/ri';
import { BsMusicNoteBeamed } from 'react-icons/bs';

import avatar from '../../assets/Images/avatar-default.jpeg'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { searchMulti, searchSuggest } from '../../actions/search_action';
import { Link, useHistory } from 'react-router-dom';
function NavBar() {
    const [sticky, setSticky] = useState(false)
    const [valueSearch, setValueSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const hotKeyWord = useSelector(state => state.search.hotKeyWord)
    const suggest = useSelector(state => state.search.suggest)

    const dispatch = useDispatch();

    const history = useHistory();
    const refInput = useRef(null);

    const scrollSetSticky = () => {
        if(window.scrollY>10){
            setSticky(true);
        }
        else setSticky(false);
    }
    
    useEffect(()=>{
        
        function watchScroll() {
            window.addEventListener("scroll", scrollSetSticky)
        }

        watchScroll();
        return ()=>{
            window.removeEventListener("scroll", scrollSetSticky);
        }
    },[])

    

    useEffect(() => {
       if(valueSearch.length > 0) {
            dispatch(searchSuggest(valueSearch));
       }
    }, [valueSearch])


    const renderIconSuggestSearch = (obj_type_name) => {
        if(obj_type_name === "song") {
            return <BsMusicNoteBeamed/> 

        }
        else if(obj_type_name === "playlist") {
            return <RiPlayListLine/>
        }
        else if(obj_type_name === "artist") {
            return <RiUserStarLine/>
        }
        else {
            return <AiOutlineSearch/>
        }

    }
    
    const renderDesscriptionSuggestSearch = (obj_type_name) => {
        if(obj_type_name === "song") {
            return <div 
                        style={{    
                            marginLeft: "10px",
                            fontSize:" 13px",
                            color: "#b3b3b3"
                        }}
                    >- trong Bài Hát</div>

        }
        else if(obj_type_name === "playlist") {
            return <div 
                        style={{    
                            marginLeft: "10px",
                            fontSize:" 13px",
                            color: "#b3b3b3"
                        }}
                    >- trong Playlist/Album</div>
        }
        else if(obj_type_name === "artist") {
            return <div 
                        style={{    
                            marginLeft: "10px",
                            fontSize:" 13px",
                            color: "#b3b3b3"
                        }}
                    >- trong Nghệ Sĩ</div>
        }
        else {
            return null;
        }
    }

    const handleChangeSearch = (e) => {
        setValueSearch(e.target.value)
    }

    const handleSearch = (value) => {
        if(value.length > 0) {
            history.push(`/search?q=${value}`)
            refInput.current.blur();
            setFocus(false);
        }
    }

    const handleOnBlur = () => {
        setTimeout(() => { //delay 150ms de nhan click chuot
            setFocus(false);
        }, 150);
    }
    return (
        <Row className={`header ${sticky ? 'is-sticky': ''}`}>
            <Col className="header-left">
                <Input
                    className={`search ${focus ? 'is-collapse': ''}`}
                    placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV…"
                    prefix={<AiOutlineSearch className="site-form-item-icon" />} 
                    onChange={(e) =>handleChangeSearch(e)} 
                    onFocus={() => setFocus(true)}
                    onBlur={handleOnBlur}
                    onPressEnter={() => handleSearch(valueSearch)}
                    ref={refInput}
                />
                {
                    focus ? 
                    <ul className="search-suggest_list" >
                        {
                            hotKeyWord && hotKeyWord.length && valueSearch.length === 0? hotKeyWord.map((item, index) => (
                                <li className="search-sugest_item" key={index} onClick={() => handleSearch(item)}>
                                    <IoIosTrendingUp/>
                                    <div>{item}</div>
                                 </li>
                               
                            )) : null
                        }

                        {suggest && suggest.length && valueSearch.length > 0 ? suggest.map((item, index) => (
                            <li className="search-sugest_item" key={index} onClick={() => handleSearch(item.keyword)}>
                                {renderIconSuggestSearch(item.obj_type_name)}
                                <div>{item.keyword}</div>
                                {renderDesscriptionSuggestSearch(item.obj_type_name)}
                            </li>
                            
                        )) : null
                    }
                    
                    </ul>
                    : null
                }
                
            </Col>
            <Col className="header-right">
                <ul>
                    <Tooltip title="Thông báo" placement="bottom" overlayStyle={{fontSize:'12px'}}>
                        <Link to="/as">
                            <li className="btn-circle">
                                <IoMdNotificationsOutline/>
                            </li>
                        </Link>
                       
                    </Tooltip>
                    <Tooltip title="Cài đặt" placement="bottom" overlayStyle={{fontSize:'12px'}}>
                        <li className="btn-circle">                        
                            <AiOutlineSetting/>                       
                        </li>
                    </Tooltip>
                    <Tooltip title="Thông tin tài khoản" placement="bottom" overlayStyle={{fontSize:'12px'}}>
                        <li className="btn-circle avt-img">
                            <LazyLoadImage
                                effect="blur"
                                alt='avt'
                                height={'100%'}
                                src={avatar} 
                                width={'100%'} 
                            /> 
                        </li>
                    </Tooltip>
                    <li>
                        <button className="btn-login login">Đăng nhập</button>
                    </li>
                </ul>
            </Col>     
        </Row>
    )
}

export default NavBar
