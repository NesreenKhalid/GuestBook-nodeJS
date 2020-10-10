const Message = require('../models/Message');


module.exports.get_all = async (req, res) => {
    try {
        const msgs = await Message.find();
        res.status(200).json(msgs);
    } catch (err) {
        console.log('err all msgs', err)
        res.status(500).json(err);
    }
}

module.exports.get_details = async (req, res) => {
    try {
        const msg = await Message.findById(req.params.id);
        res.status(200).json(msg);

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.msg_post = async (req, res) => {
    try{
        const msg = await Message.create(req.body);
        console.log('msg_post', msg)
        res.status(201).json(msg);
    }catch(err){
        console.log('err post_msg', err)
        res.status(400).json({ error: err });
    }
}

// hint for me : adding date of reply !!!!
module.exports.msg_reply = async (req, res) => {
    console.log('req reply', req);

    try {
        var msg = await Message.findById(req.params.id).exec();
        msg.replies.push(req.body);
        var result = await msg.save();
        res.status(200).json(result);

    } catch (err) {
        console.log('err', err)
        res.status(500).json(err);
    }
}

module.exports.msg_edit = async (req, res) => {
    console.log('msg edit req.body', req.body)

    try {
        var msg = await Message.findById(req.params.id).exec();
        msg.set(req.body);
        var result = await msg.save();
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports.msg_delete = async (req, res) => {
    try{
        const result = await Message.deleteOne({_id: req.params.id}).exec();
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    
}