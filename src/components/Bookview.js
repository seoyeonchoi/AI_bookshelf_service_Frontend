import React from "react";
import classnames from "classnames";
// reactstrap components

//our components
import user_info from "../assets/sample_user.json";
import sample from "../assets/sample_book.json";
import getlist from "./GetList_user";
import get_recentlyAdded_list from "./GetRecentlyAddedList";

import "../styles/Book-view.css";

import {
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function Card({ children }) {
  return <div className="book-view-card">{children}</div>;
}

export default function Bookview(props) {
  const [iconTabs, setIconsTabs] = React.useState(1);
  const [textTabs, setTextTabs] = React.useState(4);
  let [recentlyAdded_count, recentlyAdded_list] =
    get_recentlyAdded_list(sample);
  let [totalBook_count, totalBook_list] = getlist(
    sample,
    user_info.user_bookshelf.book_id
  );
  let [likes_count, Likes_list] = getlist(sample, user_info.user_like_book);
  let [saved_count, saved_list] = getlist(sample, user_info.user_cart);

  return (
    <>
      <Container
        className=""
        style={{ width: "100%", padding: 0, ...props.style }}
      >
        <CardHeader>
          <Nav className="nav-tabs-info" role="tablist" tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: iconTabs === 1,
                })}
                onClick={(e) => setIconsTabs(1)}
                href="#pablo"
              >
                <i className="tim-icons icon-spaceship" />
                전체보기
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: iconTabs === 2,
                })}
                onClick={(e) => setIconsTabs(2)}
                href="#pablo"
              >
                <i className="tim-icons icon-settings-gear-63" />
                최근 추가 항목
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: iconTabs === 3,
                })}
                onClick={(e) => setIconsTabs(3)}
                href="#pablo"
              >
                <i className="tim-icons icon-bag-16" />
                좋아하는 책
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: iconTabs === 4,
                })}
                onClick={(e) => setIconsTabs(4)}
                href="#pablo"
              >
                <i className="tim-icons icon-settings-gear-63" />
                찜해둔 책
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
        <CardBody>
          <TabContent className="tab-space" activeTab={"link" + iconTabs}>
            <TabPane tabId="link1">
              <p>
                <h3> 내 서재에 저장된 책 (총 {totalBook_count}개)</h3>
                {totalBook_list}
              </p>
            </TabPane>
            <TabPane tabId="link2">
              <p>
                <h3>최근 추가한 항목({recentlyAdded_count}개)</h3>
                {recentlyAdded_list}
              </p>
            </TabPane>
            <TabPane tabId="link3">
              <p>
                <h3> 좋아하는 책 ({likes_count}개)</h3>
                {Likes_list}
              </p>
            </TabPane>
            <TabPane tabId="link4">
              <p>
                <h3> 찜해둔 책 ({saved_count}개)</h3>
                {saved_list}
              </p>
            </TabPane>
          </TabContent>
        </CardBody>
      </Container>
    </>
  );
}
