const express = require('express');
const router = express.Router()
const { requestAPI } = require('../utils');
var _ = require('lodash');
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD
});


router.get('/gallery', async (req,res)=> {
  const { page } = req.query
  let nameAPI ='/api/v2/home';
  let param = `page=${page}`;

  try {
    let response = await requestAPI(nameAPI,{page:page},param)
    if( response.err !== 0 ){
      return res.status(400).json(response.msg)
    }

    return res.status(200).json(response.data)
  } catch (error) {
        console.log(error)
        res.status(400).json(error);
  }
})

router.get('/playlist', async (req,res)=> {
  const { page } = req.query

  let nameAPI ='/api/v2/home';
  let param = `page=${page}`;

  try {
    let response = await requestAPI(nameAPI,{page:page},param)
    if( response.err !==0 ){
      return res.status(400).json(response.msg)
    }

    return res.status(200).json(response.data)
  } catch (error) {
        console.log(error)
        res.status(400).json(error);
  }
})

router.get('/song/playlist', async (req,res)=> {
    const {type, count, start, encodeId} = req.query

    let nameAPI = '/api/v2/song/getList';
    let param  = `id=${encodeId}type=${type}`
    let paramCount = `count=${count}`
    try {
      let response = await requestAPI(nameAPI,{type: type,id: encodeId,start: start,count: count},param,paramCount)
      
      if( response.err !==0 ){
        return res.status(400).json(response.msg)
      }
      
      let filterVipSong = response.data.items.filter(e => e.streamingStatus === 1); //loc bai hat chi danh cho vip
      response.data.items = filterVipSong;
      
      return res.status(200).json(response.data)
    } catch (error) {
          console.log(error)
          res.status(400).json(error);
    }
})


router.get('/song', async (req,res) => {

  const { encodeId } = req.query;  
  let nameAPI = '/api/v2/song/getStreaming';
  let param = `id=${encodeId}`

  try {
    let response = await requestAPI(nameAPI,{id: encodeId},param)
    console.log(response);
    if( response.err !==0 ){
      return res.status(400).json(response.msg)
    }
    

    let resultUpload = await cloudinary.v2.uploader.upload(response.data["128"], { 
      resource_type: "video", 
      public_id: `imusic${encodeId}`,
      overwrite: true, 
    });
    if(resultUpload.url) {
      response.data["128"] = resultUpload.url;
    }
    
    
    return res.status(200).json(response.data)
  } catch (error) {
        console.log(error)
        res.status(400).json(error);
  }
})

router.get('/song/suggested', async (req,res) => {
  const {  start, encodeId} = req.query
  let nameAPI = '/api/v2/recommend/getSongs';
  let param = `id=${encodeId}`
  let paramCount = `count=${20}`
  try {
    let response = await requestAPI(nameAPI,{id: encodeId,start: start,count: 20},param,paramCount)
    
    if( response.err !==0 ){
      return res.status(400).json(response.msg)
    }

    let array  = _.sampleSize(response.data.items, 5); //random lay 5 trong 20 bai hat
    
    
    return res.status(200).json(array)
  } catch (error) {
      console.log(error)
      res.status(400).json(error);
  }
})

router.get('/search', async (req,res) => {
  const { query } = req.query;
  let nameAPI = '/api/v2/search/multi';
  let param = '';

  try {
    let response = await requestAPI(nameAPI,{ q: query},param);
    return res.status(200).json(response);

  } catch (error) {
    res.status(400).json(error);
  }

})

router.get('/search/suggestKeyword', async (req,res) => {
  const { query } = req.query;
  let nameAPI = '/suggestKeyword/desktop';
  let param = '';
  
  try {
    let response = await requestAPI(nameAPI,{num: 10, query: query},param);
    return res.status(200).json(response);

  } catch (error) {
    res.status(400).json(error);
  }
})

router.get('/search/getHotKeyword', async (req,res) => {
  let nameAPI = '/api/v2/app/getHotKeyword';
  let param = '';

  try {
    let response = await requestAPI(nameAPI,{},param);
    return res.status(200).json(response);

  } catch (error) {
    res.status(400).json(error);
  }

})

router.get('/search/detail', async (req,res) => {
  const { query, type, page } = req.query;
  let nameAPI = '/api/v2/search';
  let param = `page=${page}type=${type}`;
  let paramCount = `count=18`

  try {
    let response = await requestAPI(nameAPI,{ q: query, type: type, page: page, count: 18 },param, paramCount);
    return res.status(200).json(response);

  } catch (error) {
    res.status(400).json(error);
  }

})

router.get('/search/getCounter', async (req,res) => {
  const { query } = req.query;
  let nameAPI = '/api/v2/search/getCounter';
  let param = '';

  try {
    let response = await requestAPI(nameAPI,{ q: query },param);
    return res.status(200).json(response);

  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router;
