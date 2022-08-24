
const chat_names=["dhruv trehan","komal bhardwaj","shreya vats","himanshu j","nikki","leesha sharma","mansi vasisth"];
const chat_names_length=chat_names.length;
const chat_msg=["hello from this side...","what are you doing here...","yes he became successful person in future"];
const chat_msg_length=chat_msg.length;
const chat_img_length=7;

class ChatHandler{

    constructor(chat_template,chat_list)
    {
        this.hashmap= new Map();
        this.linkedlist=null;
        this.chat_template=chat_template;
        this.chat_list=chat_list;
        let clock=new Date();
        this.hours=clock.getHours;
        this.mins=clock.getMinutes;
    }

    getTime(){
        // Time Stamp creation for messages
        this.mins += 1;
        if(this.mins === 60){
            this.hours += 1;
            this.mins = 0;
        }

        if(this.hours === 24){
            this.hours = 0;
        }

        return ("0" + this.hours).slice(-2)+":"+("0" + this.mins).slice(-2);
    }

    createNode(id){
        // Creating node element
        let node = {};
        // Pointers to prev and next
        node['next'] = null;
        node['prev'] = null;
        // Create a copy of chat template
        let chat_item = this.chat_template.cloneNode(true);
        // Setting name, message, image to template item
        chat_item.querySelector('#Name').innerText = chat_names[id%chat_names_length];
        chat_item.querySelector('#Message').innerText = chat_msg[id%chat_msg_length];
        console.log("./images/avatar" + eval(1+(id%chat_img_length)) + ".png");
        chat_item.querySelector('#Image').src = "./images/avatar" + eval(1+(id%chat_img_length)) + ".png";
        node['chat_item'] = chat_item;
        return node;
    }

    newMsg(id)
    {
        let node=null;
        if((id in this.hashmap)===false)
        {
         node=this.createNode(id);
        this.hashmap[id]=node;
        }
        else{
            node=fetchfromlist(id);
        }

        if(this.linkedlist===null)
        node=this.linkedlist;

        else
        {
            node['next']=this.linkedlist;
            this.linkedlist['prev']=node;

            this.linkedlist=node;
        }
        this.updatelist();
    }

    deletemsg(id)
    {
        let node=fetchfromlist(id);
        delete this.hashmap[id];
        this.updatelist();
    }
    fetchfromlist(id)
    {
        let node=this.hashmap[id];
        let prevnode=node['prev'];
        let nextnode=node['next'];

        if(prevnode!==null)
        prevnode['next']=nextvnode;

        if(nextnode!==null)
        nextnode['prev']=prevnode;
        
        if(node===this.linkedlist)
        this.linkedlist=nextnode;

        node['next']=null;
        node['prev']=null;

        return node;

    }

    updatelist()
    {
        let innerHTML='';
        let head=this.linkedlist;
        while(head!==null)
        {
            let element=head['chat_item'];
            if(head===this.linkedlist)
            {
                element.className="ks-item ks-active";
                element.querySelector('#Time').innerText = this.getTime();
            }
            else{
                element.className="ks-item";
            }
            innerHTML+=element.outerHTML;
            head=head['next'];
        }
        this.chat_list.innerHTML = innerHTML;
    }
}

module.exports = { ChatHandler, chat_names};