<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Final Project</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="/">Home </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/admin">Admin Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/live-music-events">Live Events</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/my-profile">My Profile</a>
      </li>
      <form class="form-inline"  action="/search-artist" method="get">
    <input class="form-control mr-sm-2" type="search" placeholder="Search song" aria-label="Search" name="term" required></input>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" href="/search-artist">Search</button>
  </form>
      <li class="nav-item">
        <a class="nav-link" href="/logout">Logout</a>
      </li>
      
    </ul>
  </div>
</nav>
