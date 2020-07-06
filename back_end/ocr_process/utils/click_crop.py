# import the necessary packages
import argparse
import cv2
import tkinter as tk
from tkinter import simpledialog


class SelectObjects:

    def __init__(self):
        self.items = {}
        self.refPt = []
        self.cropping = False
        self.image = None

    def input_box(self):
        ROOT = tk.Tk()

        ROOT.withdraw()
        # the input dialog
        USER_INP = simpledialog.askstring(title="Name of item",
                                          prompt="What's item's Name?:")
        return USER_INP

    # initialize the list of reference points and boolean indicating
    # whether cropping is being performed or not

    # item = {}
    # refPt = []
    # cropping = False
    # image = None

    def click_and_crop(self, event, x, y, flags, param):
        # grab references to the global variables
        global refPt, cropping
        # if the left mouse button was clicked, record the starting
        # (x, y) coordinates and indicate that cropping is being
        # performed
        if event == cv2.EVENT_LBUTTONDOWN:
            refPt = [(x, y)]
            cropping = True
        # check to see if the left mouse button was released
        elif event == cv2.EVENT_LBUTTONUP:
            # record the ending (x, y) coordinates and indicate that
            # the cropping operation is finished
            name = self.input_box()
            refPt.append((x, y))
            cord = (refPt[0][0], refPt[0][1], refPt[1][0], refPt[1][1])
            self.items[name] = cord
            cropping = False
            # draw a rectangle around the region of interest
            cv2.rectangle(image, refPt[0], refPt[1], (255, 0, 0), 2)
            new_xy = [(refPt[0][0], refPt[0][1] - 20), (refPt[1][0], refPt[0][1])]
            cv2.rectangle(image, new_xy[0], new_xy[1], (255, 0, 0), -1)

            cv2.putText(image, name, (new_xy[0][0] + 5, new_xy[0][1] + 13), cv2.FONT_HERSHEY_COMPLEX, 0.5,
                        (255, 255, 255),
                        1)
            cv2.imshow("image", image)

    def get_objects(self, img):
        global image
        # construct the argument parser and parse the arguments
        # ap = argparse.ArgumentParser()
        # ap.add_argument("-i", "--image", required=True, help="Path to the image")
        # args = vars(ap.parse_args())
        # # load the image, clone it, and setup the mouse callback function
        # image = cv2.imread(args["image"])
        image = img
        cv2.namedWindow("image")
        cv2.setMouseCallback("image", self.click_and_crop)
        # keep looping until the 'q' key is pressed
        # while True:

        while True:
            # display the image and wait for a keypress
            cv2.imshow("image", image)
            key = cv2.waitKey(1) & 0xFF
            # if the 'r' key is pressed, reset the cropping region
            if key == ord("q"):
                return
            # if the 'c' key is pressed, break from the loop
            elif key == ord("c"):
                # print(self.item)
                return self.items

        cv2.destroyAllWindows()


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument("-i", "--image", required=True, help="Path to the image")
    args = vars(ap.parse_args())
    # load the image, clone it, and setup the mouse callback function
    img = cv2.imread(args["image"])

    select = SelectObjects()
    dicte = select.get_objects(img)

    print(list(dicte.keys()))
    print(list(dicte.values()))
