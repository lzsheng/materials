import * as React from 'react';
import BasicLayout from '../BasicLayout';
import UserLayout from '../UserLayout';

const { useEffect, useRef } = React;
export default function FrameworkLayout(props: {
  children: React.ReactNode;
  pathname: string;
  appLeave: { path: string };
  appEnter: { path: string };
}) {
  const { pathname, children, appLeave, appEnter } = props;
  const Layout = pathname === '/login' ? UserLayout : BasicLayout;
  useEffect(() => {
    console.log('== app leave ==', appLeave);
    if (appLeave.path === '/angular' && window.webpackJsonp) {
      // remove webpackJsonp added by Angular app
      delete window.webpackJsonp;
    }
  }, [appLeave]);

  useEffect(() => {
    console.log('== app enter ==', appEnter);
  }, [appEnter]);
  
  const childrenRef = useRef(children);

  useEffect(() => {
    console.info('路由改变时，children是否一致', pathname, childrenRef.current === children);
    childrenRef.current = children;
  }, [pathname]);

  return (
    <Layout pathname={pathname}>{children}</Layout>
  );
}
