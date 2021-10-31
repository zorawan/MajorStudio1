## Project B Scrolling Scrolls
### Idea iteration
#### Color of Fashion
* One color represents a woman's clothing from a painting.
* ≈ 2000 objects.
<br></br>
* ![projectB_1](https://user-images.githubusercontent.com/6037803/138577449-edc0d1ba-690c-41bc-bccd-8118a63f37c1.jpg)
- - - -
#### Color of plants
* Use the plants' images in botany department and find the images' color to represent plant in the form of a dot.
* Combining dots and recreate the plant.
* Mouse over to zoom in to the image.
<br></br>
  ![projectB_2](https://user-images.githubusercontent.com/6037803/138577508-b1bda20f-5f41-481a-9b80-c60a16780e7c.jpg)
- - - -
#### Women of the US National Herbarium (Velva E. Dudd's Garden)
* I want to use plants' common names to group imnages. From this "garden view" users can navigate between different plants categories.
* By zoom in to a single image, users can see the whole picture of the collection.
<br></br>
  ![projectB_3](https://user-images.githubusercontent.com/6037803/138577512-ac8edea4-a572-4ae4-a727-675648d9549d.jpg)
- - - -
#### Years of Collecting Plants
* By stack all the image thumbnails which were collected in the same year, we can see the overall trand of plant collection in Botany department.
* One block represents an image.
* Hovering on a column to see the top 3 common names of plants.
<br></br>
  ![projectB_4](https://user-images.githubusercontent.com/6037803/138577515-9cd00505-0804-41c3-96b1-27257cc1ea1d.jpg)
- - - -
#### Botanical Art in Relations
* 889 Botanical Arts drew in ink shows the detail of the plants.
* Use D3 node to represent plants relationship by taxonomy.
<br></br>
  ![projectB_5](https://user-images.githubusercontent.com/6037803/138577516-9f81b23c-0d28-4238-ab1a-1899e765341f.jpg)
- - - -
#### IUCN Red List Over Time
* Based on the top 3 or 10 popular animals in smithsonian Zoo, I want to see their over time survival status.
* Endangious level over time.
** Ex. LC = Least cocern, EN = Endangered, EW = Extinct in the wild
  <br></br>
  ![projectB_6](https://user-images.githubusercontent.com/6037803/138577517-c3e1d4f7-9b95-4a1d-b418-a4a387819007.jpg)
- - - -
#### Scrolling Scrolls of Chinese Paintings
* Scroll the screen to see 500 Chinese Paintings over time.
* Date Source: Freer Gallery of Art and Arthur M. Sackler Gallery
* Type: Painting
* Culture: chinese
* The paintings' name shows on the right side of the screen when hoving.
* All the scrolls listed by time and can be navigate through the left dragging bar.
  <br></br>
  ![projectB_7](https://user-images.githubusercontent.com/6037803/138577518-43479d46-328c-4f1c-81f2-166ad9fef21f.jpg)
- - - -
### Mockup iteration
Moving forward with the idea: Scrolling scrolls of Chinese Paintings 

#### Version 1
* Define the elements on the screen: timeline with dynasties, iamges, title, artist, medium, topics.
<br></br>
![idea1_v2](https://user-images.githubusercontent.com/6037803/138578319-05dfb759-e1eb-4053-baf7-3ff0d578c2d9.png)
- - - -
#### Version 2
* Iterating the timeline and add more transparent blocks to represent images.
<br></br>
![idea1_v3](https://user-images.githubusercontent.com/6037803/138578320-71934e2b-c000-4447-8949-a6a2b568cccd.png)
- - - -
#### Version 3
* Updating the timeline which use the iamges' title as a navigation.
* Remove medium since almost all the Chinese paintings were painted by ink and silk. 
<br></br>
![idea1_v4_1](https://user-images.githubusercontent.com/6037803/138578321-2dfaf68e-72e6-4ffe-9fe5-0adbfec86096.png)
- - - -
### Prototype
* Clickable figma prototype based on the version3 mockup:
[Version 3 with interaction](https://www.figma.com/proto/GM5z2EksfVAiYP5HPmiwDR/Project-B?page-id=0%3A1&node-id=147%3A383&viewport=284%2C48%2C0.25&scaling=contain&starting-point-node-id=119%3A239)
- - - -
### Implementation Screenshot
<br></br>
* After working on code, I remove the artist and the timeline on left. I use the ul tag instead.
* Adding the title "Scrolling scrolls" and the description on top.
![idea1_v4_prototype_shot](https://user-images.githubusercontent.com/6037803/139563329-bce9bb50-9c6f-42cb-9df8-a9629ae170f6.png)


