from .utils.process import preprocess_for_ocr, ocr
# from text_detection import text_detection, load_text_model
from .utils.crop import crop
from .utils.spacial_map import string_type, position_definer
from .utils.click_crop import SelectObjects
from googletrans import Translator
from .utils.deskew import deskew
import cv2
import re
import json


def text_corrector(_text):
    translator = Translator()
    _text = re.sub(r"\d", "", _text)
    _text = re.sub(r'\W+', ' ', _text)
    _text = re.sub(r'(?:^| )\w(?:$| )', ' ', _text).strip()
    # words = re.findall(r'\w+', _text)
    w = translator.translate(_text)
    if w.extra_data['possible-mistakes']:
        _text = w.extra_data['possible-mistakes'][1]
    else:
        _text = w.extra_data['translation'][0][1]

    return _text


def detect(img_path, boxes_and_labels, debug=False, rotate=False, ):
    counter = 0
    flag = False
    if rotate:
        deskew(img_path)
        image = cv2.imread('data/after_rotate.jpg')
    else:
        image = cv2.imread(img_path)
    # print(img_path, '*'*50)
    # Apply several filters to the image for better results in OCR
    image = preprocess_for_ocr(image, 1)
    print(image.shape)
    if debug:
        cv2.imwrite('./data/output-opt.png', image)

    # detecting the text
    # text_blob_list = text_detection
    f = open('ocr_process/boxs.json', )

    # returns JSON object as
    # a dictionary
    text_dict = json.load(f)['boxes']
    # text_dict = SelectObjects().get_objects(image.copy())
    text_blob_list = boxes_and_labels['boxes']
    labels = boxes_and_labels['labels']
    # for i in text_dict:
    #     text_blob_list.append(i['box'])
    #     labels.append(i['label'])

    # text_blob_list = list(text_dict.values())
    text_location_list = []  # store all the metadata of every text box
    nutrient_dict = {}  # Dictionary to store nutrient labels and their values

    # labels = list(text_dict.keys())
    label_counter = 0
    img_counter = 0
    # Apply OCR to to blobs and save data in organized dict
    for blob_cord__ in text_blob_list:
        blob_cord = blob_cord__
        if blob_cord__[0] == 0:
            myList = list(blob_cord__)
            myList[0] += 10
            blob_cord = tuple(myList)

        if debug:
            img_counter += 1
            word_image = crop(image, blob_cord, "ocr_process/result/{}.jpg".format(img_counter), 0.005, True)
            print(blob_cord, img_counter)
        else:
            word_image = crop(image, blob_cord, "./", 0.005, False)
        # word_image = preprocess_for_ocr(word_image)
        text = ocr(word_image, 1, 7)

        if debug:
            print('before correction: ', "text")
        text = text_corrector(text)
        print('after correct: ', "text")
        if not text:
            text = ""
        center_x = (blob_cord[0] + blob_cord[2]) / 2
        center_y = (blob_cord[1] + blob_cord[3]) / 2
        box_center = (center_x, center_y)

        new_location = {
            'label': labels[label_counter],
            'bbox': blob_cord,
            'text': text,
            'box_center': box_center,
            'string_type': string_type(text)
        }
        label_counter += 1
        text_location_list.append(new_location)

    # Spatial algorithm that maps all boxes according to their location and append the string
    for text_dict in text_location_list:
        if (text_dict['string_type'] == 2):
            for text_dict_test in text_location_list:
                if position_definer(text_dict['box_center'][1], text_dict_test['bbox'][1],
                                    text_dict_test['bbox'][3]) and text_dict_test['string_type'] == 1:
                    text_dict['text'] = text_dict['text'].__add__(' ' + text_dict_test['text'])
                    text_dict['string_type'] = 0

    return text_location_list


def start_ocr(path, boxes_and_labels):
    output_text = detect(path, boxes_and_labels, debug=False)
    return output_text


if __name__ == '__main__':
    # load_text_model()
    text = detect('media\output-opt.png', True)
    print(text)
