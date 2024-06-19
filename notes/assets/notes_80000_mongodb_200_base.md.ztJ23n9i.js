import{_ as s,c as a,o as i,a4 as n}from"./chunks/framework.DtKRdLJw.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"notes/80000_mongodb/200_base.md","filePath":"notes/80000_mongodb/200_base.md"}'),t={name:"notes/80000_mongodb/200_base.md"},e=n(`<h3 id="创建-切换至对应的database" tabindex="-1">创建/切换至对应的database <a class="header-anchor" href="#创建-切换至对应的database" aria-label="Permalink to &quot;创建/切换至对应的database&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建一个user的数据库</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">use</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> users</span></span></code></pre></div><h3 id="展示所有database" tabindex="-1">展示所有database <a class="header-anchor" href="#展示所有database" aria-label="Permalink to &quot;展示所有database&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">show</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> database</span></span></code></pre></div><h3 id="创建collection" tabindex="-1">创建collection <a class="header-anchor" href="#创建collection" aria-label="Permalink to &quot;创建collection&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 创建一个info的集合</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">db.create.collection(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&#39;info&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h3 id="展示所有collection" tabindex="-1">展示所有collection <a class="header-anchor" href="#展示所有collection" aria-label="Permalink to &quot;展示所有collection&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">show</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> collections</span></span></code></pre></div><h3 id="删除collection" tabindex="-1">删除collection <a class="header-anchor" href="#删除collection" aria-label="Permalink to &quot;删除collection&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">db.info.drop</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span></code></pre></div><h3 id="创建document" tabindex="-1">创建document <a class="header-anchor" href="#创建document" aria-label="Permalink to &quot;创建document&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 插入文档</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">db.info.insertOne(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;name&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;tom&quot;,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;age&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;18&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 插入文档</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">db.info.insertMany([</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;name&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;jack&quot;,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;age&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;18&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  { </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;name&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;jerry&quot;,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;age&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;17&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">])</span></span></code></pre></div><h3 id="查询document" tabindex="-1">查询document <a class="header-anchor" href="#查询document" aria-label="Permalink to &quot;查询document&quot;">​</a></h3><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">db.info.find</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   { _id: ObjectId(&#39;6661bf399b2943fdd82a32d8&#39;), name: &#39;tom&#39;, age: &#39;18&#39; },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   { _id: ObjectId(&#39;6661bf889b2943fdd82a32d9&#39;), name: &#39;jack&#39;, age: &#39;18&#39; },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   { _id: ObjectId(&#39;6661bf889b2943fdd82a32da&#39;), name: &#39;jerry&#39;, age: &#39;17&#39; }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">db.info.find(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;age&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;18&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   { _id: ObjectId(&#39;6661bf399b2943fdd82a32d8&#39;), name: &#39;tom&#39;, age: &#39;18&#39; },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#   { _id: ObjectId(&#39;6661bf889b2943fdd82a32d9&#39;), name: &#39;jack&#39;, age: &#39;18&#39; }</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># ]</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">db.info.find(</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;age&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;18&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> },</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;name&quot;:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 1,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;_id&quot;:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> }</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># output: [ { name: &#39;tom&#39; }, { name: &#39;jack&#39; } ]</span></span></code></pre></div>`,15),h=[e];function l(p,k,d,o,c,r){return i(),a("div",null,h)}const u=s(t,[["render",l]]);export{F as __pageData,u as default};