import { Link } from "framework7-react";
import React from "react";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { CALL_PHONE, OPEN_LINK } from "../../constants/prom21";
import userService from "../../service/user.service";
import { iOS } from "./../../constants/helpers";
import ZaloIcon from "../../assets/images/zalo-icon.png";
import { SERVER_APP } from "../../constants/config";

export default class quickAction extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }
  componentDidMount() {
    this.getPhone();
  }
  getPhone = () => {
    userService
      .getConfig("Chung.sdt,chung.link.fanpage,Chung.zalo")
      .then((response) => {
        this.setState({
          phone:
            response.data.data &&
            response.data.data.length > 1 &&
            response.data.data[1].ValueText,
          zalo:
            response.data.data &&
            response.data.data.length > 2 &&
            response.data.data[2].ValueText
              ? `https://zalo.me/${response.data.data[2].ValueText}`
              : `https://zalo.me/${response.data.data[1].ValueText}`,
        });
      })
      .catch((err) => console.log(err));
  };

  handleCall = (phone) => {
    CALL_PHONE(phone);
  };
  handleLink = (link) => {
    OPEN_LINK(link);
  };
  onOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { mess, phone, isOpen, zalo } = this.state;
    if (!mess && !phone && !zalo) return <></>;
    return (
      <div className={`page-quick ${isOpen ? "open" : ""}`}>
        <div className="page-quick-list">
          {phone && (
            <div
              className="item call"
              onClick={() => this.handleCall(phone && phone)}
            >
              <FaWhatsapp />
            </div>
          )}
          {mess && (
            <>
              {iOS() ? (
                <Link external href={mess} noLinkClass className="item mess">
                  <FaFacebookMessenger />
                </Link>
              ) : (
                <div
                  className="item mess"
                  onClick={() => this.handleLink(mess)}
                >
                  <FaFacebookMessenger />
                </div>
              )}
            </>
          )}
          {zalo && (
            <>
              {iOS() ? (
                <Link external href={zalo} noLinkClass className="item">
                  <img
                    src={SERVER_APP + ZaloIcon}
                    style={{ borderRadius: "100%" }}
                  />
                </Link>
              ) : (
                <div className="item" onClick={() => this.handleLink(zalo)}>
                  <img
                    src={SERVER_APP + ZaloIcon}
                    style={{ borderRadius: "100%" }}
                  />
                </div>
              )}
            </>
          )}
        </div>
        <div className="btn-quick" onClick={this.onOpen}>
          <div className="btn-quick-trans">
            <FaWhatsapp />
            <i className="las la-times times"></i>
          </div>
        </div>
      </div>
    );
  }
}
