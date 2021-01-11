# readlee_trophies

This is my idea for a student trophy screen that can be used to showcase student acheivment in Readlee. This was created using [Bootstrap](https://getbootstrap.com/) and [Bootstrap Native](https://thednp.github.io/bootstrap.native/). To run the webpage, simply clone the repository and open `index.html`. I added a control panel at the top to help increment each of the metrics that are monitored and have corresponding trophies.

It is also possible to update the metrics manually using the following code:

```javascript
userInfo.metric = newValue;
updateCounts();
```

For example, the accuracy can be updated like this:

```javascript
userInfo.accuracy = 0.8;
updateCounts();
```

I do not own any of the images used here. Copyrights and/or trademarks of any images used belong to their respective owners.
