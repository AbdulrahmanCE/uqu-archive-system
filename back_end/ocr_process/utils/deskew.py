import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('data/rotated.PNG', cv2.IMREAD_GRAYSCALE)


def compute_skew(image):
    # image = cv2.bitwise_not(image)
    height, width = image.shape
    lines = cv2.HoughLinesP(image, 1, np.pi / 180, 100, minLineLength=width / 2.0, maxLineGap=20)
    angle = 0.0
    nlines = lines.shape[0]
    lines = lines.reshape(lines.shape[0], 4)
    for x1, y1, x2, y2 in lines:
        angle += np.arctan2(y2 - y1, x2 - x1)
    angle /= nlines
    return angle * 180 / np.pi

def deskew(img_path):
    image = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
    image = cv2.bitwise_not(image)
    img = image
    for i in range(2):
        angle = compute_skew(img.copy())

        non_zero_pixels = cv2.findNonZero(image)
        center, wh, theta = cv2.minAreaRect(non_zero_pixels)
        root_mat = cv2.getRotationMatrix2D(center, angle, 1)
        rows, cols = image.shape
        rotated = cv2.warpAffine(image, root_mat, (cols, rows), flags=cv2.INTER_CUBIC)
        img = cv2.getRectSubPix(rotated, (cols, rows), center)
    img = cv2.bitwise_not(img)
    cv2.imwrite('data/after_rotate.jpg', img)
    return img

#
# deskewed_image = deskew('data/rotated.PNG')
#
# cv2.imshow('original', img)
# cv2.imshow('deskew', deskewed_image)
# cv2.waitKey(0)
