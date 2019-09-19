import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Button, Breadcrumb } from 'antd'
import { Menu_List } from '../configs/constants/Layout'
import Home from './Home'
import AdminList from '../views/admin/AdminList';
export default class MainLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            breadcrumb: ["首页"],
            isShow: true
        }
    }

    /**
     * renderSider
     */
    renderSider = () => {
        return (
            <Layout.Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={() => this.onCollapse()}
            >
                <Menu
                    mode="inline"
                    theme="dark"
                >
                    {
                        Menu_List.map(v => this.renderMenu(v))
                    }
                </Menu>
            </Layout.Sider>
        )
    }
    /**
     * renderMenu
     */
    renderMenu = (v) => {
        let { key, title, icon } = v;
        //if has submenu
        if (v.hasOwnProperty('submenu') && v['submenu'].length > 0) {
            return (
                <Menu.SubMenu
                    key={key}
                    title={<span><Icon type={icon} /><span>{title}</span></span>}
                >
                    {v['submenu'].map(v1 => this.renderMenu(v1))}
                </Menu.SubMenu>
            )
        } else {
            return (
                <Menu.Item
                    key={key}
                    onClick={() => this.onClickMenu(v)}
                >
                    <Icon type={icon} />
                    <span>{title}</span>
                    <Link to={`${this.props.match.path}${v['path']}`}></Link>
                </Menu.Item>
            )
        }
    }
    /**
     * onClickMenu
     */
    onClickMenu = (v) => {
        let { key, title } = v;
        let breadcrumb1 = [title];
        let breadcrumbItem = Menu_List[key.substring(0, 1) - 1];
        if (breadcrumbItem.hasOwnProperty('submunu') && breadcrumbItem['submenu'].length > 0) {
            breadcrumb1.splice(1, 0, breadcrumbItem['title']);
        }
        this.setState({breadcrumb: breadcrumb1})
    }
    /**
     * onCollapse public
     */
    onCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    /**
     * renderHeader
     */
    renderHeader = () => {
        return (
            <Layout.Header style={styles.header}>
                <Button type="primary" onClick={() => this.onCollapse()}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Icon type="user" style={{ fontSize: 20 }}></Icon>
                    <p style={{ margin: 0, marginLeft: 8 }}>{`管理员`} {`鸟窝`}</p>
                    <Button type="primary" onClick={() => {
                        alert('登出成功！')
                    }} style={{ marginLeft: 10 }}>登出</Button>
                </div>
            </Layout.Header>
        )
    }
    /**
     * renderContent
     */
    renderContent() {
        console.log('this.props.match.path',this.props.match.path)
        return (
            <Layout.Content style={styles.content}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    {this.state.breadcrumb.map((item, index) => <Breadcrumb.Item key={index.toString()}>{item}</Breadcrumb.Item>)}
                </Breadcrumb>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                    {/* {this.props.children} */}
                    <Router>
                        <Switch>
                            <Route path='/' exact component={Home}></Route>
                            <Route path={`${this.props.match.path}/admin`} component={AdminList} ></Route>
                        </Switch>
                    </Router>
                </div>
            </Layout.Content>
        )
    }
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                {this.renderSider()}
                <Layout>
                    {this.renderHeader()}
                    {this.renderContent()}
                    <Layout.Footer style={{ textAlign: 'center' }}>
                        星辰无限科技有限公司@2019-2022
                    </Layout.Footer>
                </Layout>
            </Layout>
        )
    }
}
const styles = {
    header: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', background: '#fff' },
    content: { display: 'flex', flex: 1, flexDirection: 'column', margin: '0 10px' },
};