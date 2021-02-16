import { useState, useContext } from 'react';
import styled from 'styled-components';
import ReactedUsers from './ReactedUsers';
import { Context } from './Store';
const Wrapper = styled.section`
  width: auto;
  height: 300px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 0.5rem;
  position: absolute;
  top: 24px;
  z-index: 1;
  left:0;
`
const Heading = styled.h3`
  margin: 0.5rem 1rem;
  font-size:14px;
`

const TabWrapper = styled.section`
`
const TabNav = styled.ul`
  list-style-type: none;
  padding:0;
  margin:0;
  height: 40px;
  display: flex;
  line-height: 40px;
  border-bottom: 1px solid #e0e0e0;
  box-sizing:border-box;
`
const TabNavItem = styled.li`
  padding:0 16px;
  cursor: pointer;
  &.active {
    border-bottom: 1px solid #0f62fe;
  }
`
const Count = styled.span`
  margin-left:0.25rem;
`
const TabContent = styled.div`
  overflow-y: scroll;
  height: calc(300px - 80px);
`
const TabPane = styled.div`
display:none;
padding: 1rem;
&.active {
  display: block;
}
`

const Summary = ({ activeEl, postId, reactionsData, reactionsDataGrouped }) => {
  const [state, dispatch] = useContext(Context);
  const [activeTab, setActiveTab] = useState(activeEl)
  const handleTabNav = (e) => {
    e.stopPropagation();
    setActiveTab(e.target.dataset.target);
  }
  return (
    <Wrapper>
      <Heading>Reactions</Heading>
      <TabWrapper>
        <TabNav>
          <TabNavItem className={activeTab === 'all' ? "active" : ''} data-target="all" onClick={handleTabNav}>
            All {reactionsData.length}
          </TabNavItem>
          {Object.keys(reactionsDataGrouped).map(key => {
            let getEmoji = state.emojis.find(o => o.id == key);
            return (
              <TabNavItem className={activeTab === key ? "active" : ''} data-target={key} onClick={handleTabNav}>
                {getEmoji.emoji} <Count>{reactionsDataGrouped[key].length}</Count>
              </TabNavItem>
            )
          })}
        </TabNav>
        <TabContent>
          <TabPane id="all" className={activeTab === 'all' ? "active" : ''}>
            <ReactedUsers reactionsData={reactionsData} />
          </TabPane>
          {Object.keys(reactionsDataGrouped).map(key => {
            return (
              <TabPane id={key} className={activeTab === key ? "active" : ''}>
                <ReactedUsers reactionsData={reactionsDataGrouped[key]} />
              </TabPane>
            )
          })}
        </TabContent>
      </TabWrapper>
    </Wrapper >
  )
}

export default Summary;