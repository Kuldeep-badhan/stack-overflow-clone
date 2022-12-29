import React from "react";
import { HiPencil } from "react-icons/hi";
import { RiMessageFill } from "react-icons/ri";
import stackicon from '../../assets/icon.svg';
const RightSidebar = () => {
  return (
    <aside className="right-sidebar">
      <div className="detail-section">
        <article>
          <h4>The Overflow Blog</h4>
          <ul>
               <li>
         
            <span>  <HiPencil  className="icon-rside" /> </span>Observability is key to the future of software (and
              your DevOps carrer)
            </li>
            <li>
         
            <span>  <HiPencil  className="icon-rside"/> </span> Podcast 374: How valuable is your screen name?
            </li>
          </ul>
        </article>
        <article>
          <h4>Featured on Meta</h4>
          <ul>
            <li> <span> <RiMessageFill className="icon-rside"/> </span> 
            Review queue workflows - Final release....
            </li>
            <li> <span> <RiMessageFill className="icon-rside"/> </span> Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG</li>
            <li>
                <img src={stackicon} alt="stackicon" className="stackicon" style={{width:'1.2rem'}}/>
                Outdated Answers: accepted answer is now unpinned on Stack Overflow
            </li>
          </ul>
        </article>
        <article>
          <h4>The Overflow Blog</h4>
          <ul>
            <li>
            <span>38</span> Why was this spam flag declined, yet the question marked as spam?


            </li>
            <li> <span>20</span>What is the best course of action when a user has high enough rep to...</li>
            <li> <span>14</span>Is a link to the "How to ask" help page a useful comment?</li>
          </ul>
        </article>
      </div>
      <div className="tag-section">
        <h4>Watched tags</h4>
        <ul>
          <li>c</li>
          <li>css</li>
          <li>html</li>
          <li>javascript</li>
          <li>php</li>
          <li>express</li>
          <li>cpp</li>
          <li>mysql</li>
          <li>react js</li>
          <li>python</li>
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar;
