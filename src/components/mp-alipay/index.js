"use strict";
import Taro from "@tarojs/taro";
console.log(133333);
if (Taro.getEnv() === "ALIPAY") {
  function e(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (e[t] = n),
      e
    );
  }
  /*!
   * mp-html v2.4.1
   * https://github.com/jin-yufeng/mp-html
   *
   * Released under the MIT license
   * Author: Jin Yufeng
   */
  var t = require("./parser"),
    n = [];
  Component({
    data: { nodes: [] },
    props: {
      containerStyle: "",
      content: "",
      copyLink: !0,
      domain: "",
      errorImg: "",
      lazyLoad: !1,
      loadingImg: "",
      pauseVideo: !0,
      previewImg: !0,
      scrollTable: !1,
      setTitle: !0,
      showImgMenu: !0,
      tagStyle: {},
    },
    didMount: function () {
      this.plugins = [];
      for (var e = n.length; e--; ) this.plugins.push(new n[e](this));
      this.props.content && this.setContent(this.props.content);
    },
    didUpdate: function (e) {
      e.content !== this.props.content && this.setContent(this.props.content);
    },
    didUnmount: function () {
      this._hook("onDetached");
    },
    methods: {
      in: function (e, t, n) {
        e && t && n && (this._in = { page: e, selector: t, scrollTop: n });
      },
      navigateTo: function (t, n) {
        var o = this;
        return new Promise(function (i, r) {
          if (!o.props.useAnchor) return void r(Error("Anchor is disabled"));
          var s = my
            .createSelectorQuery()
            .select(
              (o._in ? o._in.selector : "._root") +
                (t ? "".concat(" ", "#").concat(t) : "")
            )
            .boundingClientRect();
          o._in
            ? s
                .select(o._in.selector)
                .scrollOffset()
                .select(o._in.selector)
                .boundingClientRect()
            : s.selectViewport().scrollOffset(),
            s.exec(function (t) {
              if (!t[0]) return void r(Error("Label not found"));
              var s =
                t[1].scrollTop +
                t[0].top -
                (t[2] ? t[2].top : 0) +
                (n || parseInt(o.props.useAnchor) || 0);
              o._in
                ? o._in.page.setData(e({}, o._in.scrollTop, s))
                : my.pageScrollTo({ scrollTop: s, duration: 300 }),
                i();
            });
        });
      },
      getText: function (e) {
        var t = "";
        return (
          (function e(n) {
            for (var o = 0; o < n.length; o++) {
              var i = n[o];
              if ("text" === i.type) t += i.text.replace(/&amp;/g, "&");
              else if ("br" === i.name) t += "\n";
              else {
                var r =
                  "p" === i.name ||
                  "div" === i.name ||
                  "tr" === i.name ||
                  "li" === i.name ||
                  ("h" === i.name[0] && i.name[1] > "0" && i.name[1] < "7");
                r && t && "\n" !== t[t.length - 1] && (t += "\n"),
                  i.children && e(i.children),
                  r && "\n" !== t[t.length - 1]
                    ? (t += "\n")
                    : ("td" !== i.name && "th" !== i.name) || (t += "\t");
              }
            }
          })(e || this.data.nodes),
          t
        );
      },
      getRect: function () {
        return new Promise(function (e, t) {
          my.createSelectorQuery()
            .select("._root")
            .boundingClientRect()
            .exec(function (n) {
              return n[0] ? e(n[0]) : t(Error("Root label not found"));
            });
        });
      },
      pauseMedia: function () {
        for (var e = (this._videos || []).length; e--; )
          this._videos[e].pause();
      },
      setPlaybackRate: function (e) {
        this.playbackRate = e;
        for (var t = (this._videos || []).length; t--; )
          this._videos[t].playbackRate(e);
      },
      setContent: function (e, n) {
        var o = this;
        (this.imgList && n) || (this.imgList = []), (this._videos = []);
        var i = {},
          r = new t(this).parse(e);
        if (n)
          for (var s = this.data.nodes.length, a = r.length; a--; )
            i["nodes[".concat(s + a, "]")] = r[a];
        else i.nodes = r;
        if (
          (this.setData(i, function () {
            o._hook("onLoad"), o.props.onLoad && o.props.onLoad();
          }),
          this.props.lazyLoad ||
            this.imgList._unloadimgs < this.imgList.length / 2)
        ) {
          var c = 0,
            l = function e(t) {
              (t && t.height) || (t = {}),
                t.height === c
                  ? o.props.onReady && o.props.onReady(t)
                  : ((c = t.height),
                    setTimeout(function () {
                      o.getRect().then(e).catch(e);
                    }, 350));
            };
          this.getRect().then(l).catch(l);
        } else
          this.imgList._unloadimgs ||
            this.getRect()
              .then(function (e) {
                o.props.onReady && o.props.onReady(e);
              })
              .catch(function () {
                o.props.onReady && o.props.onReady({});
              });
      },
      _hook: function (e) {
        for (var t = n.length; t--; )
          this.plugins[t][e] && this.plugins[t][e]();
      },
      _add: function (e) {
        e.root = this;
      },
    },
  });
}
