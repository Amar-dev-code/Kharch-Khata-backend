# Kharch-Khata-backend

Backend for Kharch-Khata

To build the image
docker build -t (image name)
example : docker build -t node-app-expensetracker

To run the container

- docker image ls (take the name of the iamge)
- docker run -v pathatwhichapplicationispresentinlocal:pathatwhichapplicationispresentincontainer -p 3000:3000 image_name bash
- ex : docker run ro -v D:\Amrendra\server_side\Kharch-Khata-backend:/app -p 3000:3000 -d node-final-image

Access the application at localhost:3000 .
