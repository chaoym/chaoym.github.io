---
permalink: /
title: "Home"
excerpt: "Yuchao Ma studies economics and computer science (EconCS), with applications in computational advertising, marketing, recommendation, and bidding."
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

<h1 class="visually-hidden">About Yuchao Ma</h1>

<div class="about-copy" id="about-me" markdown="1">

I am **Yuchao Ma**, a Ph.D. student at the [Gaoling School of Artificial Intelligence](https://ai.ruc.edu.cn/), [Renmin University of China](https://en.ruc.edu.cn/), advised by Professor [Qi Qi](https://gsai.ruc.edu.cn/qiqi). I received my B.Eng. in Information Engineering from [Beijing University of Posts and Telecommunications](https://www.bupt.edu.cn/) in 2023.

My research interests lie at the intersection of **economics and computer science (EconCS)**, with a focus on computational advertising. I explore new approaches to **advertising, marketing, recommendation, and bidding**, drawing on algorithmic game theory and mechanism design.

</div>

<h2 class="section-heading" id="news">News</h2>

<ul class="news-list">
{% for item in site.data.news limit:4 %}
  <li><span class="news-date">{{ item.date }}</span><div>{{ item.content | markdownify }}</div></li>
{% endfor %}
</ul>

{% if site.data.news.size > 4 %}
<details class="news-archive">
  <summary><span class="archive-closed">Earlier news</span><span class="archive-open">Hide earlier news</span><span class="archive-count">{{ site.data.news.size | minus: 4 }}</span></summary>
  <ul class="news-list">
  {% for item in site.data.news offset:4 %}
    <li><span class="news-date">{{ item.date }}</span><div>{{ item.content | markdownify }}</div></li>
  {% endfor %}
  </ul>
</details>
{% endif %}

<h2 class="section-heading" id="-educations">Education</h2>

<ul class="education-list">
  <li class="education-item">
    <div class="education-logo education-logo--ruc"><img src="{{ '/images/institutions/ruc.png' | relative_url }}" alt="" width="60" height="60" loading="lazy"></div>
    <div class="education-details">
      <h3>Renmin University of China</h3>
      <p class="education-school">Gaoling School of Artificial Intelligence</p>
      <p class="education-degree">Ph.D. student in Artificial Intelligence</p>
    </div>
    <div class="education-meta">
      <p class="education-location">Beijing, China</p>
      <p class="education-date">Sep 2023 – Present</p>
    </div>
  </li>
  <li class="education-item">
    <div class="education-logo"><img src="{{ '/images/institutions/bupt.png' | relative_url }}" alt="" width="60" height="60" loading="lazy"></div>
    <div class="education-details">
      <h3>Beijing University of Posts and Telecommunications</h3>
      <p class="education-school">School of Information and Communication Engineering</p>
      <p class="education-degree">B.Eng. in Information Engineering</p>
    </div>
    <div class="education-meta">
      <p class="education-location">Beijing, China</p>
      <p class="education-date">Sep 2019 – Jun 2023</p>
    </div>
  </li>
</ul>

<h2 class="section-heading" id="academic-exchanges">Presentations</h2>

<ul class="exchange-list">
{% for exchange in site.data.academic_exchanges %}
  <li>
    <time class="exchange-date" datetime="{{ exchange.month }}">{{ exchange.date }}</time>
    <div class="exchange-details">
      <h3><a href="{{ exchange.conference_url }}">{{ exchange.conference }}</a></h3>
      <p class="exchange-location">{{ exchange.location }}</p>
      <p class="exchange-presentation"><span class="exchange-type">{{ exchange.type }}</span><a href="{{ exchange.paper_url }}">{{ exchange.paper }}</a></p>
    </div>
  </li>
{% endfor %}
</ul>

<h2 class="section-heading" id="academic-service">Service</h2>

<dl class="detail-list">
  <div><dt>Reviewer</dt><dd>ICML 2026; EC 2025/2026; WINE 2025/2026; WWW 2026/2027; KDD 2026/2027; AAAI 2026/2027; IJTCS 2025</dd></div>
  <div><dt>Student Service</dt><dd>Undergraduate Student Counselor for the 2023 entering cohort, GSAI, Renmin University of China</dd></div>
  <div><dt>Memberships</dt><dd>Student member of AAAI, ACM, and CCF</dd></div>
</dl>
