## Major Studio 1 Sketch Brainstorming 

##### 1-A: Size of Ceramics

###### Questions to explore:
I want to know the actual size of a ceramic object and compare it with other objects. When visiting a museum, we can feel the size of an object from a single glance. However, it is hard when we view these ceramics online with a self-reliant picture on the screen.

###### Dataset:
Online Media + CC0 +Ceramic -Drawings

###### property and data points:
Extent Smithsonian, 1927

###### Visualization method:
Images gallery and 3d VR rendering
To provide an intuitive feeling of the size, using the gallery to display items next to another item will help users compare. Moreover, 3d VR technology will enable users to see it in physical space.

![ms_sketch1-A](https://user-images.githubusercontent.com/6037803/133909333-e0f8a96b-fc4b-4516-8373-f1e70d5a9e74.jpg)



##### 1-B: Understand Ceramics

###### Questions to explore:
I want to understand the relationship between different ceramics by time and location.

###### Dataset:
Online Media + CC0 +Ceramic -Drawings

###### property and data points:
Extent Smithsonian, 1927

###### Visualization method:
Jitter Plot: To see each object on a timeline as well as divide by region.

![ms_sketch1-B](https://user-images.githubusercontent.com/6037803/133909690-bc00aa70-9b31-46c8-b301-caf8c79b063e.jpg)


##### 2: What are field books talk about?

###### Questions to explore:
I want to know over time what are topics that humans are interested in the most. By calculating the counts of field books in each scientific category, I will see the answer.

###### Dataset:
Online Media + CC0 +Field books Project

###### property and data points:
Field books Project, 37 for CC0 but more without CC0

###### Visualization method:
  1. area chart: Show the proportion during a timeline to give users an overall sense of how many books and the trend of the topic.
  2. bar +pie charts: Divide the first concept into two steps. The first step is to help users compare counts of field books over time, then show a pie chart when users hover on the screen.  The pie chart will expose more details of each topics' proportion.

![ms_sketch2](https://user-images.githubusercontent.com/6037803/133909698-65464bef-f680-4e0f-932e-8dab222301cc.jpg)


##### 3-A: Women of the US National Herbarium

###### Questions to explore:
I want to see women scientists' footprints who worked in the botany field. They spent a considerable amount of time collecting samples to help us understand the plantation in our world. So I want to tell their stories by showing their footprints.

###### Dataset:
Online Media + CC0 + (women in botany with search query: Mary Agnes Chase,  Velva E. Rudd, Kittie F. Parker, Marie-Hélène Sachet...)

###### property and data points:
From the site [Women of the US National Herbarium](https://naturalhistory.si.edu/research/botany/news-and-highlights/women-us-national-herbarium), 1709 +720 + 427 +1546 +...

###### Visualization method:
Illustration, animation +  map: To tell a story of where these women scientists were, I think presenting an animation will help users understand what they were doing. It will be fun to use a map to show the location and drag the slider to move around the timeline to see their career footprint.

![ms_sketch3-A_1](https://user-images.githubusercontent.com/6037803/133909828-85fdeaf5-9933-46f8-84c4-c8b69c786806.jpg)


![ms_sketch3-A_2](https://user-images.githubusercontent.com/6037803/133909831-4aaf43d6-90cf-49af-8fb7-13f30d92b575.jpg)


##### 3-B: Women of the US National Herbarium

###### Questions to explore:
Iterate 

###### Dataset:
Online Media + CC0 + (women in botany with search query: Mary Agnes Chase,  Velva E. Rudd, Kittie F. Parker, Marie-Hélène Sachet...)

###### property and data points:
From the site [Women of the US National Herbarium](https://naturalhistory.si.edu/research/botany/news-and-highlights/women-us-national-herbarium), 1709 +720 + 427 +1546 +...

###### Visualization method:
Multi-level donut chart: Use the different sizes of the circle to present the numbers of plants in the higher level (family) category. Each circle represents a donut chart to specify the categories that belong to it. The level of the donut chart depends on the level of the taxonomy. 

![ms_sketch3-B](https://user-images.githubusercontent.com/6037803/133910052-95e42533-2666-46e4-928e-ff342114418a.jpg)


###### Hi-Fidelity Mocks:
It's interesting to see the visualization for women who worked in the science field, so I decided to work on idea 3-B. By using the dashboard style, I have more flexibility to add more charts and stories in the future.

**3-A** with single plants in one location.

![MS1_Women_of_the_US_National_Herbarian_3-A_1](https://user-images.githubusercontent.com/6037803/133912039-a67ae66b-f205-4e47-ba95-30d4a3f59261.png)


**3-A** with multiple plants in one location.

![MS1_Women_of_the_US_National_Herbarian_3-A_2](https://user-images.githubusercontent.com/6037803/133912099-1cb48b0b-1dae-4f09-81ef-542b26603e8d.png)


**3-B** Using the multi-level donut chart to show to taxonomy for one scientist.

![MS1_Women_of_the_US_National_Herbarian_3-B_1](https://user-images.githubusercontent.com/6037803/133912133-db892c7b-3c64-4a25-8da7-c5c9be6ceb20.png)

###### Prototype Screenshot:

**3-B** Iterating the idea and keep the concept which explain the taxonomy in three rings. Each of the ring represent the Order, Class, and Family for the plants in the order of the sizes.

![webshot_1](https://user-images.githubusercontent.com/6037803/135182095-5bb741cd-9394-4bc2-99f0-e9ec749d4a7f.png)
